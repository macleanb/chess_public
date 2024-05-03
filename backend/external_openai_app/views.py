""" Views for external OpenAI app """
# External Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
from openai import OpenAI

# Internal Imports
from .prompt_builder import build_possible_moves_prompt
from .prompt_builder import build_suggested_move_prompt
from .prompt_builder import make_move_for_computer_prompt

class PossibleMoves(APIView):
    """
    View to return a list of JSON dicts containing
    possible move information for a given chess piece.
    """
    def get(self, request):
        """
        Direct clients to use POSTs instead
        """
        return Response({'Error': 'Please use POST requests instead.'})

    def post(self, request):
        """
        Return a list of JSON dicts containing
        possible move information for a given chess piece.
        """
        prompt = None
        request_type = request.data['request_type']
        # print(f'I AM IN VIEWS right now request.data: {request.data}')

        match request_type:
            case 'POSSIBLE_MOVES':
                prompt = build_possible_moves_prompt(request.data)
            case 'SUGGESTED_MOVE':
                prompt = build_suggested_move_prompt(request.data)
            case _:
                pass

        load_dotenv()

        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a chess tutor, skilled at suggesting " \
                                              "chess moves to a novice chess player."},
                {"role": "user", "content": prompt}
            ]
        )

        # Update server status to console
        print(f'response message: {completion.choices[0].message.content}')

        post_response = [completion.choices[0].message, {
            'request_data' : request.data,
        }]
        return Response(post_response)


class FaceComputer(APIView):

    def post(self, request):
        """
        Return a JSON dict containing
        a move that the computer can make, based on Difficulty lvl
        """
        comp_difficulty = request.data['comp_difficulty']
        prompt = make_move_for_computer_prompt(request.data)


        load_dotenv()

        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a chess player."},
                {"role": "user", "content": prompt}
            ]
        )

        # Update server status to console
        print(f'response message: {completion.choices[0].message.content}')

        post_response = [completion.choices[0].message, {
            'request_data' : request.data,
        }]
        return Response(post_response)
