from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
from openai import OpenAI


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
        data = request.data
        piece_color = request.data['pieceColor']
        piece_first_move_made = bool(request.data['pieceFirstMoveMade'])
        piece_current_pos_file = request.data['pieceCurrentPosFile']
        piece_current_pos_rank = request.data['pieceCurrentPosRank']
        piece_type = request.data['pieceType']

        user_msg =  "You are a chess expert. " \
                    "I will first describe the current location of my chesspiece on a chessboard " \
                    "and then ask you which squares my piece is allowed to move to. " \
                    "My piece's type, current location, and color will be enlosed by brackets " \
                    "like '[' and ']'. " \
                    f"My piece is a [{piece_type}] and is located at square " \
                    f"[{piece_current_pos_file + piece_current_pos_rank}] on the chess board'. " \
                    f"The color of the chess piece is [{piece_color}]. " \
                    f"This {'is' if not piece_first_move_made else 'is not'} the {piece_type}'s " \
                    f"first move. " \
                    f"What squares on the chess board is my {piece_type} at square " \
                    f"[{piece_current_pos_file + piece_current_pos_rank}] allowed to move to? " \
                    "Please respond with an answer like this example enclosed in single-quotes: " \
                    "'Answer: [a3, a4]. '" \
                    "Your answer should list chess board squares I am allowed to move to " \
                    "enclosed between brackets ('[]'), like in my previous example. " \
                    "If I am allowed to move to more than one chess board square, please seprate " \
                    "the allowable chess board squares with commas ',' like in my previous " \
                    "example. Your answer should contain ALL possible squares my chess piece is " \
                    "allowed to move to. " \
                    " '[c7]' or '[h1,d4]' are acceptale answer formats.  " \
                    " Do not nest brackets. " \
                    "For example, please do not format the response like '[[h1,d4]]'.  Instead " \
                    "format the response with only a single set of brackets like like '[h1,d4]'."  \
                    " Do not enclose your entire answer in brackets.  For example please do not " \
                    "respond with [Answer: a3, a4].  Put only the allowable chess board " \
                    "squares between brackets."

        load_dotenv()

        # Update server status to console
        print(f'Processing help request for {piece_type}...')

        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a chess tutor, skilled at suggesting " \
                                              "chess moves to a novice chess player."},
                {"role": "user", "content": user_msg}
            ]
        )

        # Update server status to console
        print(f'response message: {completion.choices[0].message.content}')

        post_response = [completion.choices[0].message, {
            'request_data' : data,
        }]
        return Response(post_response)
