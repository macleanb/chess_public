""" This module contains functions for building AI chat prompts """

def build_possible_moves_prompt(data):
    """ Returns a string prompt for requesting possible chess moves """
    piece_color = data['pieceColor']
    piece_first_move_made = bool(data['pieceFirstMoveMade'])
    piece_current_pos_file = data['pieceCurrentPosFile']
    piece_current_pos_rank = data['pieceCurrentPosRank']
    piece_type = data['pieceType']

    # Update server status to console
    print(
        f'Building and processing possible moves for {piece_type} at ' \
        f'{piece_current_pos_file + piece_current_pos_rank}...'
        )

    return  "You are a chess expert. " \
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

def build_suggested_move_prompt(data):
    """ Returns a string prompt for requesting a suggested chess move """
    piece_color = data['pieceColor']
    piece_locations = data['allPieceLocations']

    # Update server status to console
    print(f'Building and processing a suggested move for {piece_color}...')

    return  "You are a chess expert and I am playing a game of chess. " \
            "I need your help to determine the best possible chess move I can make to win. " \
            "The color of my chess pieces will be enlosed by brackets like '[' and ']'. " \
            f"I am playing with the [{piece_color}] colored pieces." \
            "I will now describe the current locations of all chess pieces on a chessboard. " \
            "Then I will ask you which is the best move I should make in order to win.  " \
            "Below are the locations of all the chess pieces on the board:\n" \
            f"{piece_locations}" \
            "Below are instructions on how your answer should be formatted:\n" \
            "Please respond with an answer formatted like this example enclosed in " \
            "single-quotes: 'Answer: [a3, a4].'" \
            "Your answer should list the chess board square I should move my piece from, " \
            "followed by a comma, followed by the chess board square I should move my piece to. " \
            "Please enclose the answer between brackets ('[]'), like in my previous example. " \
            " '[c7, c6]' or '[h1,f3]' are acceptale answer formats.  " \
            " Do not nest brackets. " \
            "For example, please do not format the response like '[[h1,f3]]'.  Instead " \
            "format the response with only a single set of brackets like like '[h1,f3]'."  \
            " Do not enclose your entire answer in brackets.  For example please do not " \
            "respond with [Answer: a3, a4].  Put only the chess board " \
            "squares between brackets."

def build_checkmate_detection_prompt(data):
    """ Returns a string prompt for checking if the game is in checkmate """
    player_color = data['playerColor']
    piece_locations = data['allPieceLocations']

    # Update server status to console
    print(f'Checking if the game is in checkmate for {player_color} player...')

    return "You are a chess expert. " \
           "I am playing a game of chess and need your help to determine if the game is in checkmate. " \
           "The current board state will be described, and you will determine if the game is in checkmate. " \
           "The color of the chess pieces will be enclosed by brackets like '[' and ']'. " \
           f"I am playing with the [{player_color}] colored pieces." \
           "Below are the current locations of all chess pieces on the board:\n" \
           f"{piece_locations}" \
           "Please respond with a 'Yes' or 'No' indicating whether the game is in checkmate. " \
           "Your response should be formatted as 'Answer: Yes' or 'Answer: No'. " \
           "Make sure to capitalize 'Yes' or 'No' and include the colon after 'Answer'." \
           "Do not include any additional information or punctuation in your response."