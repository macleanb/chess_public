# External Imports
from rest_framework import serializers
from django.apps import apps
from rest_framework.utils.serializer_helpers import ReturnDict

# Internal Imports
from icons_app.models import Icon
from .models import Game, Piece
from icons_app.serializers import IconSerializer
from chess_users.serializers import UserSerializer, ChessUser

class GameSerializer(serializers.ModelSerializer):
    """
    Serializer for Game class
    """
    # Couldn't get this to work
    # player1 = UserSerializer()

    class Meta:
        """
        Meta settings to the Game serializer class
        """
        model = Game
        fields = '__all__'
    
    # Override deserialization because the above field setting
    # wouldn't work
    def to_representation(self, instance):
        """ Overrides deserialization """
        result = super().to_representation(instance)
        player1_id = result['player1']
        player1 = ChessUser.objects.get(pk=player1_id)
        player1_serialized = UserSerializer(player1)
        result['player1'] = player1_serialized.data

        player2_id = result['player2']
        if player2_id is not None:
            player2 = ChessUser.objects.get(pk=player2_id)
            player2_serialized = UserSerializer(player2)
            result['player2'] = player2_serialized.data
        return result

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
