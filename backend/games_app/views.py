# External Imports
from dotenv import load_dotenv
from openai import OpenAI
from django.utils import timezone
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
import logging
from .create_pieces_for_new_game import create_pieces_for_new_game
from .models import Game
#from ..external_openai_app.prompt_builder import build_checkmate_detection_prompt
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
            
            # Check if there is a piece to be captured
            captured_piece = updated_game.pieces.filter(
                current_file=destination_square_id[0],
                current_rank=destination_square_id[1]
            ).exclude(pk=piece_id).first()

            # If there is, set on_board= false
            if captured_piece:
                captured_piece.on_board = False
                captured_piece.save()
                
            #if self.is_checkmate(updated_game):
                # Update game status, ended datetime, and winner
            #    updated_game.game_status = 'completed'
            #    updated_game.ended_datetime = timezone.now()
            #    updated_game.game_winner = updated_game.whose_turn
            #    updated_game.save()

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
        except Game.DoesNotExist:
            return Response(status=404)
        
    #def is_checkmate(self, updated_game):
        try:
            player_color = updated_game.whose_turn.player_color
            all_piece_locations = self.get_all_piece_locations(updated_game)
            is_checkmate = self.send_checkmate_request(player_color, all_piece_locations)
            return is_checkmate
        except Exception as e:
            print(f"Error in is_checkmate function: {e}")
            return False

    #def get_all_piece_locations(self, updated_game):
        all_piece_locations = {}

        for piece in updated_game.pieces.all():
            current_position = piece.current_file + piece.current_rank
            if piece.on_board:
                all_piece_locations[piece.piece_color] = all_piece_locations.get(piece.piece_color, [])
                all_piece_locations[piece.piece_color].append(current_position)
        return all_piece_locations
    
    #def send_checkmate_request(self, player_color, all_piece_locations):
        prompt = self.build_checkmate_detection_prompt({
            'playerColor': player_color,
            'allPieceLocations': all_piece_locations
        })

        client = OpenAI()

        try:
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a chess tutor, skilled at suggesting " \
                                                "chess moves to a novice chess player."},
                    {"role": "user", "content": prompt}
                ]
            )

            if completion.choices:
                response_content = completion.choices[0].message.content
                is_checkmate = True if 'Answer: Yes' in response_content else False
                return {'is_checkmate': is_checkmate}
            else:
                return {}

        except Exception as e:
            logging.error(f"Error in send_checkmate_request: {e}")
            return {}






class PlayableGamesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        """
        Method for getting all playable Game objects
        """
        try:
            # Get all open games that do not have this user as player 1
            open_games = Game.objects.filter(player2 = None).exclude(player1 = request.user.id)

            # Get all games where user is either player1 or player2
            user_games_as_player_1 = Game.objects.filter(player1 = request.user.id)
            user_games_as_player_2 = Game.objects.filter(player2 = request.user.id)

            # Combine the query sets (all=False means no duplicates)
            combined_set = open_games.union(user_games_as_player_1, all=False)
            combined_set = combined_set.union(user_games_as_player_2, all=False)

            serialized_games = GameSerializer(combined_set, many=True).data

            return Response(serialized_games)
        except Game.DoesNotExist:
            return Response(status=404)
