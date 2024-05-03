""" This module returns an optimal move for a chess board,
    given a list of moves that have been made so far
Reference: https://stockfish.online/docs.php
"""
from dotenv import dotenv_values
import requests # <== import requests so we can utilize it within our CBV to make API calls
import chess

def get_best_move(moves_made):
    """ This method takes in a list of moves and creates a 
        Python-Chess board representation with pieces in the 
        current configuration given the moves that have been
        made.
        
        It then gets the best move for the board and returns it
        as a str (i.e. 'a2a4') """

    # Create a Board object from Python-Chess
    board = chess.Board()

    # Update the board by making moves for each move that
    # was provided on the current board
    for move in moves_made:
        # Update the Python-Chess board to reflect where each
        # piece should be by making all moves in sequence
        origin_square = move['origin_file'] + move['origin_rank']
        destination_square = move['destination_file'] + move['destination_rank']
        combined_move_string = origin_square + destination_square

        move = chess.Move.from_uci(combined_move_string)
        board.push(move) # make the move on the Python-Chess board
    
    # Get the FEN
    FEN = board.fen()

    # Now the board should be all up to date with moves that have been made.
    # Now, query the API to get the best move
    env = dotenv_values(".env") # sets the value of `env` to an OrderedDictionary
    API_KEY = env.get("RAPIDAPI_KEY")

    # for rapidapi version
    #url = "https://chess-stockfish-16-api.p.rapidapi.com/chess/api"
    # data = {
    #     "fen": FEN
    # }

    # for stockfish.online version
    url = "https://stockfish.online/api/s/v2.php" + f'?fen={FEN}&depth={15}'

    # for rapidapi version
    # headers = {
    #     'content-type': "application/x-www-form-urlencoded",
    #     'X-RapidAPI-Key': API_KEY,
    #     'X-RapidAPI-Host': 'chess-stockfish-16-api.p.rapidapi.com'
    # }

    # for rapidapi version
    # response = requests.post(url=url, data=data, headers=headers)

    # for stockfish online version
    response = requests.get(url=url)
    responseJSON = response.json()

    best_move = None

    # for stockfish online version
    if 'success' in responseJSON:
        best_move_str = responseJSON['bestmove']
        best_move = best_move_str.split()[1]

    # for rapidapi version
    # try:
    #     best_move = responseJSON['bestmove']
    # except KeyError:
    #     print(f'No best move for FEN: "{FEN}"')

    return best_move
