from .models import Icon
from rest_framework import serializers


class IconSerializer(serializers.ModelSerializer):
    """ Serializer for Icon Class """
    image = serializers.ImageField(
        max_length=None,
        allow_empty_file=True,
        allow_null=True,
        required=False
    )

    class Meta:
        """ Meta class for IconSerializer """
        model = Icon
        fields = '__all__'
