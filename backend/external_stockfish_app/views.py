""" Views for external Stockfish app """
# External Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
from openai import OpenAI

# Internal Imports
from games_app.models import Game
from .get_best_move import get_best_move

class SuggestedMove(APIView):
    """
    View to return a suggested move.
    """
    def get(self, request, game_id):
        """
        Return a string containing a suggested move for a given game.
        """
        try:
            game = Game.objects.get(id=game_id)
            best_move = get_best_move(game.moves_made['moves'])
            return Response({'best_move': best_move})
        except Game.DoesNotExist:
            return Response(status=404)

