""" This module returns a dict of legal moves for a chess board,
    given a list of moves that have been made so far """

import chess

def get_possible_moves(moves_made):
    """ This method takes in a list of pieces and creates a 
        Python-Chess board representation with those pieces.
        
        It then gets the legal moves for the board and returns them
        as a dict, keyed by the origin square, where values are
        lists of legal destination squares -- ['a3', 'a4'] """

    # Create a Board object from Python-Chess
    board = chess.Board()

    # Update the board by making moves for each piece that
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
    # Now, create a dict of legal moves where the key is the origin square
    # and the value is a list [] of destination squares
    legal_moves = {}
    for move in board.legal_moves:
        move_str = str(move)
        origin_square_id = move_str[0:2]
        destination_square_id = move_str[2:4]

        # If the origin square key is already in legal moves dict,
        # append the destination_square_id to the existing list
        if origin_square_id in legal_moves:
            current_destination_squares = legal_moves[origin_square_id]
            updated_destination_squares = current_destination_squares
            updated_destination_squares.append(destination_square_id)
            legal_moves[origin_square_id] = updated_destination_squares
        else:
            legal_moves[origin_square_id] = [destination_square_id]

    return legal_moves
