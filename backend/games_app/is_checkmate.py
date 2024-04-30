""" This module returns a boolean value indicating whether
    the given move sequence for a chess board results in
    checkmate """

import chess

def is_checkmate(moves_made):
    """ This method takes in a list of moves and creates a 
        Python-Chess board representation with pieces in the 
        current configuration given the moves that have been
        made.
        
        It then queries the board to determine if the sequence
        of moves resulted in checkmate, returning the result
        (True/False). """

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

    # Now the board should be all up to date with moves that have been made.
    # Now, query the board to see if the move sequence resulted in checkmate

    result = board.is_checkmate()
    return result
