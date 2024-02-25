from rest_framework import serializers
from .models import *
from .managers import ChessUserManager
from django.contrib.auth.models import Permission
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

UserModel = get_user_model()

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessUser
        fields = ['email']


# class UserRegisterSerializer(serializers.ModelSerializer):
#     # This serializer is problematic because it won't let API calls overwrite
#     # records with existing ImageField file entries with None (sent via null)
#     image = serializers.ImageField(max_length=None, allow_empty_file=True, allow_null=True, required=False)

#     class Meta:
#         model = ChessUser
#         fields = '__all__'


#     def create(self, clean_data):
#         address_ID = None
#         address = None

#         if clean_data['fk_mailing_address'] and isinstance(clean_data['fk_mailing_address'], str):
#             try:
#                 address_ID = int(clean_data['fk_mailing_address'])
#             except Exception as e:
#                 print(e)
#         elif clean_data['fk_mailing_address'] and isinstance(clean_data['fk_mailing_address'], int):
#             address_ID = clean_data['fk_mailing_address']


#         if address_ID:
#             try:
#                 address = Address.objects.get(pk=address_ID)
#             except Exception as e:
#                 print(e)


#         extra_fields = {
#             'first_name'        : clean_data['first_name'],
#             'last_name'         : clean_data['last_name'],
#             'is_active'         : clean_data['is_active'],
#             'is_staff'          : clean_data['is_staff'],
#             #'image'             : clean_data['image'],
#             'fk_mailing_address': address
#         }
#         user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'], **extra_fields)
#         return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    # Convert e-mail provided by user to lowercase
    def check_user(self, clean_data):
        clean_data['email'] = clean_data['email'].lower()
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=True, allow_null=True, required=False)

    class Meta:
        model = ChessUser
        fields = '__all__'
    
    # Overridden because the base get_image wasn't including the full path.
    # Reference: https://stackoverflow.com/questions/35522768/django-serializer-imagefield-to-get-full-url
    def get_image(self, user):
        request = self.context.get('request')
        image = user.image.url
        return request.build_absolute_uri(image)
    
    # Replaces original raw password with hashed password
    # Converts email to lowercase
    def create(self, validated_data):
        validated_data['email'] = validated_data['email'].lower()
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['name']
