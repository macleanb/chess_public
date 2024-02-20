# External Imports
from rest_framework import serializers
from django.apps import apps
from rest_framework.utils.serializer_helpers import ReturnDict

# Internal Imports
from icons_app.models import Icon
from .models import Game, Piece
from icons_app.serializers import IconSerializer

class GameSerializer(serializers.ModelSerializer):
    """
    Serializer for Game class
    """
    class Meta:
        """
        Meta settings to the Game serializer class
        """
        model = Game
        fields = '__all__'

class PieceSerializer(serializers.ModelSerializer):
    """
    Serializer for Game class
    """
    # I couldn't get these to include the absolute URL.  They only included a relative path
    # But for some reason when I call (api) directly to Icons app from the frontend,
    # the absolute urls are provided (?)
    #fk_icon = serializers.StringRelatedField(many=False)
    #fk_icon = IconSerializer(many=False, required=False, allow_null=True, read_only=True)

    class Meta:
        """
        Meta settings to the Game serializer class
        """
        model = Piece
        fields = '__all__'
