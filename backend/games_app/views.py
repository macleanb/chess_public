# External Imports
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status

# Internal Imports
from .create_pieces_for_new_game import create_pieces_for_new_game
from .models import Game
from .serializers import GameSerializer, PieceSerializer, Piece


class GamesView(APIView):
    """
    This class automates views for all Game objects
    """
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [
    #     *api_settings.DEFAULT_PERMISSION_CLASSES,
    #     DjangoModelPermissions,
    #     GamePermissions
    # ]

    # Populates user info, adds pieces (with icons)
    # and returns all piece data and icon data in the API response
    def post(self, request):
        """
        Create method for creating Game objects
        """
        # user_id = request.user.id
        updated_data = request.data.copy()

        # Couldn't get this to work with nested serializer
        #updated_data['player1'] = request.user
        updated_data['player1'] = request.user.id
        updated_data['player2'] = None

        player1_color = updated_data['player1_color']
        if player1_color == 'light':
            updated_data['whose_turn'] = request.user.id
        else:
            updated_data['whose_turn'] = None

        # serializer = GameSerializer(data=request.data)
        serializer = GameSerializer(data=updated_data)
        if serializer.is_valid(raise_exception=True):
            new_game = serializer.save()

            # Create pieces, add icons, and pass new_game to their game fields
            # Serialize each piece, 
            # add each piece to pieces dict (keyed by square i.e. 'a1')
            pieces = create_pieces_for_new_game(new_game)
            serialized_pieces = [PieceSerializer(piece).data for piece in pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece

            # Attach a moves_made dict with an empty list
            moves_made = {
                'moves' : [
                    # {
                    #  'player_id' : int,
                    #  'origin_rank' : int,
                    #  'origin_file' : char,
                    #  'destination_rank' : int,
                    #  'destination_file' : int,
                    #  'moving_piece_id' : int,
                    #  'captured_piece_id' : int (or null) 
                    # }, ...
                ]
            }
            new_game.moves_made = moves_made

            new_game.save()

            serialized_game = GameSerializer(new_game).data

            serialized_game['pieces'] = serialized_pieces_dict

            return Response(serialized_game)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GameView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    # Populates user info, adds pieces (with icons)
    # and returns all piece data and icon data in the API response
    def put(self, request, game_id):
        """
        Method for updating Game objects
        """
        try:
            put_data = request.data.copy()
            updated_game = Game.objects.get(pk=game_id)

            piece_id = put_data['piece_id']
            destination_square_id = put_data['destination_square_id']

            updated_piece = Piece.objects.get(pk=piece_id)

            updated_piece.current_file = destination_square_id[0]
            updated_piece.current_rank = destination_square_id[1]
            updated_piece.save()

            # Create pieces, add icons, and pass new_game to their game fields
            # Serialize each piece, 
            # add each piece to pieces dict (keyed by square i.e. 'a1')

            pieces = updated_game.pieces.all()
            serialized_pieces = [PieceSerializer(piece).data for piece in pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece
            
            serialized_game = GameSerializer(updated_game).data
            serialized_game['pieces'] = serialized_pieces_dict

            return Response(serialized_game)
            

            #return Response({"data" : f"Hey I got your put request.  Piece ID was {piece_id} and destination square was {destination_square_id}"})
        except Game.DoesNotExist:
            return Response(status=404)
