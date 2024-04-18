import json

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.settings import api_settings
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions, status

from .models import *
from .serializers import *
from .permissions import ChessUsersViewPermissions, ChessUserViewPermissions, user_has_perm # AuthenticatedUserPermissions
from .serializers import UserLoginSerializer, UserSerializer  # TODO redundant import?

#######################
###  Helper Methods ###
#######################


def get_permissions_from_permissions_obj_list(permission_obj_list):
    permission_list = []

    try:
        for perm_obj in permission_obj_list:
            permission_serializer = PermissionSerializer(perm_obj)
            permission_list.append(permission_serializer['name'].value)
    except Exception as e:
        print(e)
    
    return permission_list


def get_permissions_for_user(user):
    permission_list = []

    try:
        permission_obj_list = list(user.user_permissions.all())
        permission_list += get_permissions_from_permissions_obj_list(permission_obj_list=permission_obj_list)

        group_list = user.groups.all()
        for group in group_list:
            permission_obj_list = list(group.permissions.all())
            permission_list += get_permissions_from_permissions_obj_list(permission_obj_list=permission_obj_list)
    except Exception as e:
        print(e)

    return permission_list


class UsersView(APIView):
    # DjangoModelPermissions not required here because GET permissions must be checked in 
    # ChessUsersViewPermissions anyway (since this returns a list view), POST (add) permissions 
    # aren't required (since we want new users to be able to self-register before they have
    # any permissions), and PUT/PATCH/DELETE requests are not supported by this view.
    # queryset = ChessUser.objects.all() # only required if using DjangoModelPermissions
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, ChessUsersViewPermissions]
    def get(self, request):
        # Help reference: https://stackoverflow.com/questions/35522768/django-serializer-imagefield-to-get-full-url
        output = [UserSerializer(obj, context={"request": request}).data for obj in UserModel.objects.all()]
        
        return Response(output)

    # This could be used by administrators
    def post(self, request):
        # Make sure basic users aren't able to add is_staff if they don't have permissions
        if request.data.get('is_staff') == 'true':
            if not user_has_perm(request.user, 'Can assign ALL permissions', 'users.can_assign_all_permissions'):
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Make sure basic users aren't able to add is_superuser if they don't have permissions
        if request.data.get('is_superuser') == 'true':
            if not user_has_perm(request.user, 'Can assign ALL permissions', 'users.can_assign_all_permissions'):
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_user = serializer.save()

            # Add new user to Basic User Group
            if (new_user):
                basic_user_group = Group.objects.get(name="basicusers")
                new_user.groups.add(basic_user_group)

            return Response(serializer.data)


class UserView(APIView):
    """
    Takes in a user id and returns the user data as long as the request.user has the 
    appropriate permissions.
    """

    queryset = ChessUser.objects.all() # required for using permissions classes
    permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, DjangoModelPermissions, ChessUserViewPermissions]

    def get(self, request, user_id):
        """
        Returns a single user object, if one exists for user_id.  Otherwise returns a 404 error.
        """
        serializer = UserSerializer(UserModel.objects.get(pk=user_id), context={"request": request})

        if serializer.data:
            return Response(serializer.data)
        
        return Response(status=status.HTTP_404_NOT_FOUND)


    def patch(self, request, user_id):
        """
        Updates user object and returns the updated object. Otherwise returns a 400 error.
        """
        user = ChessUser.objects.get(pk=user_id)

        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            # Set the password if password data is in the request
            if request.data.get("password"):
                new_password = request.data.get("password")
                user.set_password(new_password)
                user.save()

            permission_list = get_permissions_for_user(user=user)
            return Response({'user': serializer.data, 'permissions': JSONRenderer().render(permission_list)}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, user_id):
        """
        Deletes user object and returns an empty 204 response.
        On error it returns a 400 error.
        """
        user = ChessUser.objects.get(pk=user_id)
        
        if user:
            user.delete() # Delete user
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
    # If users need to be able to self-register, we can't enforce is_authenticated 
    # or 'Can add chessuser' permission because users that are registering
    # won't be logged in yet and they won't have any permissions.
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # Make sure self-registering users aren't able to add is_staff
        if request.data.get('is_staff') == 'true':
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Make sure self-registering users aren't able to add is_superuser
        if request.data.get('is_superuser') == 'true':
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        # data validation would normally take place here 
        #serializer = UserRegisterSerializer(data=data)
        serializer = UserSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_user = serializer.save()

            if new_user:
                basic_user_group = Group.objects.get(name="basicusers")
                new_user.groups.add(basic_user_group)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# This class won't be instantiated if a session is already active in the same
# browser (i.e. admin)
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    # TODO: is this declaration necessary here?  We don't have it in UserRegister above...
    authentication_classes = (SessionAuthentication,)
    
    def post(self, request):

        data = request.data
        # data validation would normally take place here 
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.check_user(data)
            except ValidationError as ve:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            if user:
                login(request, user)
                user_obj = ChessUser.objects.all().filter(email=user).first()
                serializer = UserSerializer(user_obj, context={"request": request})
                permission_list = get_permissions_for_user(user=user_obj)

                return Response({'user': serializer.data, 'permissions': JSONRenderer().render(permission_list)}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        # test
        print('here in views.py, user info:')
        print(request.user.id)

        logout(request)
        return Response(status=status.HTTP_200_OK)


class AuthenticatedUserView(APIView):
    # In theory, attaching additional permission_classes would be redundant, since django populates
    # request.user from the CSRF token provided.  Enforcing that a user has required permissions to 
    # view their own information wouldn't make sense because we can't enforce it when a user self-registers
    # or logs themselves in (in each case, their user information is returned (without verifying they have 
    # permission to view their own user info).  Comparing request.user and user_obj equality is redundant
    # because request.user will always be the same object that we retreve from the database ourselves.
    # queryset = ChessUser.objects.all() # required for using permissions classes
    # permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, DjangoModelPermissions, LoggedInUserPermissions]
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        user_obj = request.user
        serializer = UserSerializer(user_obj, context={"request": request})
        permission_list = get_permissions_for_user(user=user_obj)

        return Response({'user': serializer.data, 'permissions': JSONRenderer().render(permission_list)}, status=status.HTTP_200_OK)
