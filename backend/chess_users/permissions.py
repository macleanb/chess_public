from rest_framework.permissions import BasePermission

def user_has_perm(user, required_perm, perm_codename):
    # Get all the groups the user belongs to and see if any contain
    # the required permission
    if user:
        groups = user.groups.all()

        if groups:
            for group in groups:
                perms = group.permissions.all()

                if perms:
                    for perm in perms:
                        if perm.name == required_perm:
                            return True

    return user.has_perm(perm_codename)


# Reference: https://stackoverflow.com/questions/19313314/django-rest-framework-viewset-per-action-permissions
class ChessUsersViewPermissions(BasePermission):
    """
    Comprehensive permissions class for ChessUser, based on which view is being requested
    and what kind of permissions the user has.
    """

    # We can't refer to view.action in this class because the views
    # being passed in won't be automatically generated from ViewSets
    # (no differentiation between 'list' view and 'retrieve' view)

    # Model Permissions.  Use only as needed since DjangoModelPermissions in
    # the various CHessUser views' permissionclasses will enforce all model permissions
    def has_permission(self, request, view):
        # Deny actions on objects if the user is not authenticated
        if not request.user or not request.user.is_authenticated:
            return False

        # This override is necessary because the standard DjangoModelPermissions class
        # will just check for 'Can view chess user' rather than 'Can view ALL chessusers'
        if request.method == 'GET':
            return user_has_perm(request.user, 'Can view ALL chessusers', 'users.can_view_all_chessusers')

        # This override is necessary because the standard DjangoModelPermissions class
        # will require 'Can add chess user'.  This is counterproductive because new users that
        # are self-registering (with no backend user object that exists yet and has no 
        # permissions) needs to be able to add a user
        if request.method == 'POST':
            return True
        
        # No required permissions for posting, since anyone can create a new user
        return True


    # Object Permissions not required here because a different view will
    # handle PUT, PATCH, DELETE operations
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if not request.user or not request.user.is_authenticated:
            return False
        return True



class ChessUserViewPermissions(BasePermission):
    # Model Permissions.  Use only as needed since DjangoModelPermissions in
    # the various ChessUser views' permissionclasses will enforce all model permissions.
    # Since a GET will only return a single user, that will be sufficient.  No need
    # to check for 'Can view ALL chess users' here.
    def has_permission(self, request, view):
        # Deny actions on objects if the user is not authenticated
        if not request.user or not request.user.is_authenticated:
            return False
        return True


    # Handle GET, PUT, PATCH, DELETE operations on a specific object
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if not request.user or not request.user.is_authenticated:
            return False

        if request.method == 'GET':
            return obj == request.user or user_has_perm(request.user, 'Can view ALL chessusers', 'users.can_view_all_chessusers')
        elif request.method == 'PUT' or request.method == 'PATCH':
            return obj == request.user or user_has_perm(request.user, 'Can update ALL chessusers', 'users.can_update_all_chessusers')
        elif request.method == 'DELETE': # users with delete permission on the model can delete their own object
            return obj == request.user or user_has_perm(request.user, 'Can delete ALL chessusers', 'users.can_delete_all_chessusers')
        else:
            return False



# This class isn't needed since the AuthenticatedUserView just
# needs to ensure a user is authenticated and it will grab the right user
# object automatically.  Why verify a user's specific permissions to 
# view their own user data, if we don't do that when a user registers
# or logs in?
# class AuthenticatedUserPermissions(BasePermission):
#     """
#     Specialized permissions class for checking if a user is logged in, based on what kind of permissions the user has.
#     """

#     # We can't refer to view.action in this class because the views
#     # being passed in won't be automatically generated from ViewSets
#     # (no differentiation between 'list' view and 'retrieve' view)

#     # Model Permissions.  Use only as needed since DjangoModelPermissions in
#     # the various ChessUser views' permissionclasses will enforce all model permissions
#     def has_permission(self, request, view):
#         # Deny actions on objects if the user is not authenticated
#         if not request.user or not request.user.is_authenticated:
#             return False
        
#         if request.method == "GET":
#             return user_has_perm(request.user, 'Can view chess user', 'users.view_chessuser')
#         return True


#     # Object Permissions
#     def has_object_permission(self, request, view, obj):
#         # Deny actions on objects if the user is not authenticated
#         if not request.user or not request.user.is_authenticated:
#             return False

#         if request.method == "GET":
#             return obj == request.user
#         else:
#             return False
