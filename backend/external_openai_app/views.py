from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
#from openai import OpenAI
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
            content="are you able to help me understand how to make moves in the game of chess?",
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
        test_post_response = ['hello', 'this is a post response', 'a', 'b', 'c', {
            'request_data' : data,
        }]
        return Response(test_post_response)
