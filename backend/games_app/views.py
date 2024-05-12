# External Imports
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
from .create_pieces_for_new_game import create_pieces_for_new_game
from .get_possible_moves import get_possible_moves
from .is_checkmate import is_checkmate
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
        play_computer = updated_data['play_computer'] #Has either 'true' or false' string value
        # game_status = updated_data['game_status']
        # print(f"Here in POST, play_computer == 'true' {play_computer == 'true'}")
        # print(f"Here in POST, play_computer is a string {isinstance(play_computer, str)}")
        # player1 = updated_data['player1']
        # player2 = updated_data['player2']
        player1_color = updated_data['player1_color']
        
        print("The backend receives the data") 
        print(f"player1_color: {player1_color}, play_computer: {play_computer}")
        print(updated_data)
        
        # Couldn't get this to work with nested serializer
        #updated_data['player1'] = request.user
        # updated_data['player1'] = request.user.id
        # updated_data['player2'] = None  #Possibly make this Computer?

        # if play_computer == 'true':
        #     updated_data['game_type'] = 'HUMAN V. COMPUTER'
        # else:
        #     updated_data['game_type'] = 'HUMAN V. HUMAN'  
        updated_data['player1'] = request.user.id

        player1_color = updated_data['player1_color']
        if play_computer == 'true':
            updated_data['game_status'] = 'ACTIVE'
            updated_data['game_type'] = 'HUMAN V. COMPUTER'
            updated_data['started_datetime'] = timezone.now()
        else:
            updated_data['game_type'] = 'HUMAN V. HUMAN'

        # Now handle color assignment and whose turn 
        if player1_color == 'light' and play_computer == 'true':
            updated_data['player2_color'] = 'dark'
            updated_data['whose_turn'] = request.user.id
        elif player1_color == 'dark' and play_computer == 'true':
            updated_data['player2_color'] = 'light'
        elif player1_color == 'light' and play_computer == 'false':
            updated_data['player2_color'] = 'dark'
            updated_data['whose_turn'] = request.user.id
        elif player1_color == 'dark' and play_computer == 'false':
            updated_data['player2_color'] = 'light'


        print("The backend is SAVING this data") 
        print(f"player1_color: {player1_color}, play_computer: {play_computer}, updated_data['game_type']")
        print(updated_data)
    
        #Is it player1/light's turn?
        # if player1_color == 'light' and updated_data['whose_turn'] == None:
        #     updated_data['whose_turn'] = request.user.id
        # elif player1_color == 'dark' and updated_data['whose_turn'] == None:
        #     updated_data['whose_turn'] = None
        # elif player1_color == 'light' and updated_data['whose_turn'] == request.user.id:
        #     updated_data['whose_turn'] = request.user.id
        # else:
        #     updated_data['whose_turn'] = None

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
                    #  'origin_rank' : char,
                    #  'origin_file' : char,
                    #  'destination_rank' : char,
                    #  'destination_file' : char,
                    #  'moving_piece_id' : int,
                    #  'captured_piece_id' : int (or null) 
                    # }, ...
                ]
            }
            new_game.moves_made = moves_made

            new_game.save()

            serialized_game = GameSerializer(new_game).data

            serialized_game['pieces'] = serialized_pieces_dict
            serialized_game['moves_made'] = new_game.moves_made['moves']

            # Add possible moves from Python-Chess
            possible_moves = get_possible_moves(new_game.moves_made['moves'])
            serialized_game['possible_moves'] = possible_moves

            # Add boolean value for is_checkmate from Python-Chess
            game_is_checkmate = is_checkmate(new_game.moves_made['moves'])
            serialized_game['is_checkmate'] = game_is_checkmate

            return Response(serialized_game)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GameView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    # Populates user info, adds pieces (with icons)
    # and returns all piece data and icon data in the API response
    def put(self, request, game_id):
        """
        Method for updating Game objects (making moves)
        """
        try:
            put_data = request.data.copy()

            # updated_game = Game.objects.get(pk=game_id)
            updated_game = Game.objects.get(id=game_id)
            print("Received game_id:", game_id)
            # Accounts for type of game: PvP or PvC?
            game_type = updated_game.game_type

            piece_id = put_data['piece_id']
            destination_square_id = put_data['destination_square_id']

            # now handle captured piece
            captured_piece_set = updated_game.pieces.filter(
                current_file = destination_square_id[0],
                current_rank = destination_square_id[1]
            )

            if captured_piece_set.count() > 1:
                raise Exception("ERROR: There is more than one piece on the destination square")
            
            elif captured_piece_set.count() == 1:
                captured_piece = captured_piece_set.first()
                captured_piece.on_board = False
                captured_piece.current_file = ''
                captured_piece.current_rank = ''
                captured_piece.save()

            moving_piece_id = put_data['piece_id']
            moving_piece = Piece.objects.get(pk=moving_piece_id)

            # Before updating the Piece, create a move record
            move_record_dict = {
                'origin_file'      : moving_piece.current_file,
                'origin_rank'      : moving_piece.current_rank,
                'destination_file' : destination_square_id[0],
                'destination_rank' : destination_square_id[1],
            }

            # Update the moving piece's current file, rank, and first_move_made
            moving_piece.current_file = destination_square_id[0]
            moving_piece.current_rank = destination_square_id[1]
            moving_piece.first_move_made = True
            moving_piece.save()

            # Update the moves_made field
            updated_game.moves_made['moves'].append(move_record_dict)
            #PvP and Player 1 just moved
            if game_type == 'HUMAN V. HUMAN' and updated_game.whose_turn == updated_game.player1:
                updated_game.whose_turn = updated_game.player2
            #PvP and Player 2 just moved
            elif game_type == 'HUMAN V. HUMAN' and updated_game.whose_turn == updated_game.player2:
                updated_game.whose_turn = updated_game.player1
            #PvC and Player 1 (Human) just moved
            elif game_type == 'HUMAN V. COMPUTER' and updated_game.whose_turn == updated_game.player1:
                updated_game.whose_turn = None
            #PvC and Player 2 (Computer) just moved
            # Or elif game_type == 'HUMAN V. COMPUTER' and updated_game.whose_turn == None:
            else: 
                updated_game.whose_turn = updated_game.player1
            updated_game.save()

            # now that captured piece is removed, serialize the current pieces on board.
            updated_pieces = updated_game.pieces.filter(on_board = True)
            # add each piece to pieces dict (keyed by square i.e. 'a1')
            serialized_pieces = [PieceSerializer(piece).data for piece in updated_pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece

            serialized_game = GameSerializer(updated_game).data
            serialized_game['pieces'] = serialized_pieces_dict
            serialized_game['moves_made'] = updated_game.moves_made['moves']

            # Add possible moves from Python-Chess
            possible_moves = get_possible_moves(updated_game.moves_made['moves'])
            serialized_game['possible_moves'] = possible_moves

            # Add boolean value for is_checkmate from Python-Chess
            # if is_checkmate == True, set fields appropriately to end the game
            game_is_checkmate = is_checkmate(updated_game.moves_made['moves'])
            if game_is_checkmate:
                updated_game.whose_turn = None
                updated_game.ended_datetime = timezone.now()
                updated_game.game_status = 'ENDED'
                updated_game.game_winner = request.user
                updated_game.save()
            serialized_game['is_checkmate'] = game_is_checkmate

            return Response(serialized_game)
        except Game.DoesNotExist:
            return Response(status=404)

    def get(self, request, game_id):
        """
        Continuing game
        """
        try:
            game = Game.objects.get(id=game_id)
            # print("Received game_id:", game_id)
            # print("")
            # Create pieces, add icons, and pass new_game to their game fields
            # Serialize each piece, 
            # add each piece to pieces dict (keyed by square i.e. 'a1')
            pieces = game.pieces.filter(on_board = True)
            serialized_pieces = [PieceSerializer(piece).data for piece in pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece

            serialized_game = GameSerializer(game).data
            serialized_game['pieces'] = serialized_pieces_dict
            serialized_game['moves_made'] = game.moves_made['moves']

            # Add possible moves from Python-Chess
            possible_moves = get_possible_moves(game.moves_made['moves'])
            serialized_game['possible_moves'] = possible_moves

            # Add boolean value for is_checkmate from Python-Chess
            game_is_checkmate = is_checkmate(game.moves_made['moves'])
            serialized_game['is_checkmate'] = game_is_checkmate

            return Response(serialized_game, status=status.HTTP_200_OK)
        except Game.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, game_id):
        """
        Joining specific game as second player
        """
        try:
            game = Game.objects.get(id=game_id, player2__isnull=True)
            game.player2 = request.user
            game.player2_color = 'light' if game.player1_color == 'dark' else 'dark'
            game.started_datetime = timezone.now()
            game.game_status = 'ACTIVE'
            game.game_type = 'HUMAN V. HUMAN'
            game.save()

            # Create pieces, add icons, and pass new_game to their game fields
            # Serialize each piece, 
            # add each piece to pieces dict (keyed by square i.e. 'a1')
            pieces = game.pieces.all()
            serialized_pieces = [PieceSerializer(piece).data for piece in pieces]
            serialized_pieces_dict = {}
            for serialized_piece in serialized_pieces:
                key = serialized_piece['current_file'] + serialized_piece['current_rank']
                serialized_pieces_dict[key] = serialized_piece
            
            serialized_game = GameSerializer(game).data
            serialized_game['pieces'] = serialized_pieces_dict
            serialized_game['moves_made'] = game.moves_made['moves']

            # Add possible moves from Python-Chess
            possible_moves = get_possible_moves(game.moves_made['moves'])
            serialized_game['possible_moves'] = possible_moves

            # Add boolean value for is_checkmate from Python-Chess
            game_is_checkmate = is_checkmate(game.moves_made['moves'])
            serialized_game['is_checkmate'] = game_is_checkmate

            return Response(serialized_game, status=status.HTTP_200_OK)
        except Game.DoesNotExist:
            return Response({'error': 'Game not found or not joinable.'}, status=status.HTTP_404_NOT_FOUND)


class PlayableGamesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        """
        Method for getting all playable Game objects
        """
        try:
            # Get all open games that do not have this user as player 1 AND is PvP
            open_games = Game.objects.filter(player2 = None, game_type = 'HUMAN V. HUMAN')#.exclude(player1 = request.user.id)

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