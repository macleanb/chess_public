from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
from openai import OpenAI
import openai
import os
import time

class PossibleMoves(APIView):
    """
    View to return a list of JSON dicts containing
    possible move information for a given chess piece.
    """
    def get(self, request, format=None):
        """
        Return a list of JSON dicts containing
        possible move information for a given chess piece.
        """
        load_dotenv()
        api_key = os.environ.get("OPENAI_API_KEY")
        # https://www.youtube.com/watch?v=CbpsDMwFG2g
        # https://github.com/openai/openai-python
        #openai.api_key = api_key # old way
        client = openai.OpenAI()

        assistant = client.beta.assistants.create(
            name="Chess Tutor",
            instructions="You are a personal chess tutor. Answer questions about chess moves.",
            tools=[{"type": "retrieval"}],
            model="gpt-3.5-turbo-1106",
        )

        thread = client.beta.threads.create()

        message = client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="Hello. Can you please say hello?"
        )
        # What squares can a pawn in position a2 move to? please provide the answer as a list of chess board squares that start with a single letter (a-h) to denote the file and end with a single integer (1-8) to denote the rank

        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
            instructions="Please address the user as student.",
        )

        print("checking assistant status. ")

        #response = None
        # response = openai.ChatCompletion.create(
        #     model='gpt-3.5-turbo',
        #     messages=[{'role' : 'system', 'content' : 'act as a chess master'},
        #               {'role' : 'user', 'content' : 'please say "hello"'}]
        # )
        while run.status is None or run.status != 'completed':
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            print(f"still waiting...  status: {run.status}")
            time.sleep(1)
        
        messages = client.beta.threads.messages.list(thread_id=thread.id)
        output = []
        for message in messages:
            assert message.content[0].type == "text"
            print({"role": message.role, "message": message.content[0].text.value})
            output.append(message.content[0])

        client.beta.assistants.delete(assistant.id)

        test_get_response = ['this is a get response', output]
        return Response(test_get_response)

    def post(self, request, format=None):
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

        user_msg =  "I will now describe the current location of my chesspiece on a chessboard " \
                    "and ask you which squares my piece is allowed to move to. " \
                    "My piece's type, current location, and color will be enlosed by brackets " \
                    "like '[' and ']'. " \
                    f"My piece is a [{piece_type}] and is located at square " \
                    f"[{piece_current_pos_file + piece_current_pos_rank}] on the chess board'. " \
                    f"The color of the chess piece is [{piece_color}]. " \
                    f"This {'is' if not piece_first_move_made else 'is not'} the {piece_type}'s " \
                    f"first move. " \
                    f"What squares on the chess board is my {piece_type} allowed to move to? " \
                    "Your answer should contain all the squares my chess piece is allowed to " \
                    "move to. " \
                    " Your answer should contain no text other than references chess squares " \
                    "(one or more), with the comma-separated list of chess squares enclosed " \
                    "in brackets '[]'.  For example '[c7]' or '[h1,d4]'.  Do not nest brackets. " \
                    "For example, please do not format the response like '[[h1,d4]]'.  Instead " \
                    "format the response with only a single set of brackets like like '[h1,d4]'."  
        
                    # Each chess board " \
                    # "square in the answer list should start with a single letter (a-h) to " \
                    # "denote the file and end with a single integer (1-8) to denote the rank."

        load_dotenv()

        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a chess tutor, skilled in suggesting chess moves to a novice chess player."},
                {"role": "user", "content": user_msg}
            ]
        )

        while completion is None or len(completion.choices) == 0:
            print(f"still waiting...  completion: {completion}")
            time.sleep(1)

        test_post_response = [completion.choices[0].message, {
            'request_data' : data,
        }]
        return Response(test_post_response)
