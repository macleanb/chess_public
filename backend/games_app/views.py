# External Imports
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework import status

# Internal Imports
from .create_pieces_for_new_game import create_pieces_for_new_game
from .models import Game
from .serializers import GameSerializer, PieceSerializer
# from users import user

class GameViewSet(viewsets.ModelViewSet):
    """
    This class automates views for Game objects
    """
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [
    #     *api_settings.DEFAULT_PERMISSION_CLASSES,
    #     DjangoModelPermissions,
    #     GamePermissions
    # ]

    # Overrides standard create() method to add pieces (with icons)
    # and return all piece data and icon data in the API response
    def create(self, request, *args, **kwargs):
        """
        Overrides create method for creating Game objects
        """
        # user_id = request.user.id
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_game = serializer.save()

            # Retrieve user and ensure game.player1 is set to user
            # player = user.objects.get(pk=user_id)
            # new_game.player1 = player

            # TODO: Create pieces, add icons, and pass new_game to their game fields

            # TODO (?): Serialize each piece, 
            # add each piece to pieces dict (keyed by square i.e. 'a1')
            pieces = create_pieces_for_new_game(new_game)

            serialized_pieces = [PieceSerializer(piece).data for piece in pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece

            # Update whose_turn based on player1_color
            if new_game.player1_color == 'light':
                new_game.whose_turn = 'player1'
            else:
                new_game.whose_turn = 'player2'

            new_game.save()
            serialized_game = GameSerializer(new_game).data

            # TODO (?) is the commented command below necessary?
            serialized_game['pieces'] = serialized_pieces_dict

            return Response(serialized_game)
        return Response(status=status.HTTP_400_BAD_REQUEST)
