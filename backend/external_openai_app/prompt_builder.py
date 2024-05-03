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
    # print(f"Here is my ERROR in Prompt Builder: {piece_locations}")

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


def make_move_for_computer_prompt(data):
    """ Returns a string prompt for requesting a suggested chess move """
    piece_color = data['pieceColor']
    piece_locations = data['allPieceLocations']
    comp_difficulty = data['comp_difficulty']

    # Update server status to console
    print(f'The Computer is thinking of a move...')

    if comp_difficulty == 'Easy':
        return  "The Computer is making a move and requires your help. The Computer is playing " \
                "at an easy level of difficulty." \
                f"The Computer is playing with the [{piece_color}] colored pieces." \
                "light is equivalent to white and dark is equivalent to black." \
                "The Computer will now describe the current locations " \
                "of all chess pieces on a chessboard.  Then the Computer will ask you which " \
                "is a beginner/noob move the Computer should make, that is still a legal move." \
                "Below are the locations of all the chess pieces on the board:\n" \
                f"{piece_locations}" \
                "Below are instructions on how your answer should be formatted:\n" \
                "Please respond with an answer formatted like this example enclosed in " \
                "single-quotes: 'Answer: [a3, a4].'" \
                "Your answer should list the chess board square the Computer should move its " \
                "piece from, followed by a comma, followed by the chess board square the " \
                "Computer should move its piece to. " \
                "Please enclose the answer between brackets ('[]'), like in my previous example. " \
                " '[c7, c6]' or '[h1,f3]' are acceptable answer formats.  " \
                " Do not nest brackets. " \
                "For example, please do not format the response like '[[h1,f3]]'.  Instead " \
                "format the response with only a single set of brackets like like '[h1,f3]'."  \
                " Do not enclose your entire answer in brackets.  For example please do not " \
                "respond with [Answer: a3, a4].  Put only the chess board " \
                "squares between brackets."
    elif comp_difficulty == 'Medium':
        return  "The Computer is making a move and requires your help. The Computer is playing" \
                " at a medium level of difficulty. " \
                f"The Computer is playing with the [{piece_color}] colored pieces." \
                "light is equivalent to white and dark is equivalent to black." \
                "The Computer will now describe the current locations " \
                "of all chess pieces on a chessboard.  Then the Computer will ask you which " \
                "is an alright or medium-level move, but not the best move, the Computer should " \
                " make. Below are the locations of all the chess pieces on the board:\n" \
                f"{piece_locations}" \
                "Below are instructions on how your answer should be formatted:\n" \
                "Please respond with an answer formatted like this example enclosed in " \
                "single-quotes: 'Answer: [a3, a4].'" \
                "Your answer should list the chess board square the Computer should move its " \
                "piece from, followed by a comma, followed by the chess board square the " \
                "Computer should move its piece to. " \
                "Please enclose the answer between brackets ('[]'), like in my previous example. " \
                " '[c7, c6]' or '[h1,f3]' are acceptale answer formats.  " \
                " Do not nest brackets. " \
                "For example, please do not format the response like '[[h1,f3]]'.  Instead " \
                "format the response with only a single set of brackets like '[h1,f3]'."  \
                " Do not enclose your entire answer in brackets.  For example please do not " \
                "respond with [Answer: a3, a4].  Put only the chess board " \
                "squares between brackets."
    elif comp_difficulty == 'Hard':
        return  "The Computer is making a move and requires your help. The Computer is playing " \
                " at a hard level of difficulty. " \
                f"The Computer is playing with the [{piece_color}] colored pieces." \
                "light is equivalent to white and dark is equivalent to black." \
                "The Computer will now describe the current locations " \
                "of all chess pieces on a chessboard.  Then the Computer will ask you which " \
                "is a good move (high-level move), but NOT the best move, the Computer should make in" \
                "order to win. Below are the locations of all the chess pieces on the board:\n" \
                f"{piece_locations}" \
                "Below are instructions on how your answer should be formatted:\n" \
                "Please respond with an answer formatted like this example enclosed in " \
                "single-quotes: 'Answer: [a3, a4].'" \
                "Your answer should list the chess board square the Computer should move its " \
                "piece from, followed by a comma, followed by the chess board square the " \
                "Computer should move its piece to. " \
                "Please enclose the answer between brackets ('[]'), like in my previous example. " \
                " '[c7, c6]' or '[h1,f3]' are acceptable answer formats.  " \
                " Do not nest brackets. " \
                "For example, please do not format the response like '[[h1,f3]]'.  Instead " \
                "format the response with only a single set of brackets like '[h1,f3]'."  \
                " Do not enclose your entire answer in brackets.  For example please do not " \
                "respond with [Answer: a3, a4].  Put only the chess board " \
                "squares between brackets."
    else:
        return "The Computer is making a move and requires your help. The Computer is playing " \
                "at a GrandMaster level of difficulty." \
                f"The Computer is playing with the [{piece_color}] colored pieces." \
                "light is equivalent to white and dark is equivalent to black." \
                "The Computer will now describe the current locations " \
                "of all chess pieces on a chessboard.  Then the Computer will ask you which " \
                "is the best possible move the Computer should make in order to win, or at  " \
                "least force a draw ONLY if a win is not possible. In the opening Game ONLY, " \
                " when an immediate win is unlikely, the Computer will ask you " \
                "to analyze the opponent's position and advance pieces as strategically as  " \
                "as possible, with the primary goal of controlling the middle squares on the board, " \
                "and the secondary goal of developing pieces, and captilizing on opponent's mistakes." \
                """During the mid-game, the Computer will still try to occupy the middle squares, " \
                "advance pieces, protect the King, take as much of the opponent's pieces as possible,"\
                "or go for a checkmate, if possible." \
                "During the end game (or when most of the pieces on the board have already been taken off "\
                "the board), the Computer will try to take as many of the opponent's pieces,"\
                "advance pawns, and go for a checkmate if possible. """ \
                "Below are the locations of all the chess pieces on the board:\n" \
                f"{piece_locations}" \
                "Below are instructions on how your answer should be formatted:\n" \
                "Please respond with an answer formatted like this example enclosed in " \
                "single-quotes: 'Answer: [a3, a4].'" \
                "Your answer should list the chess board square the Computer should move its " \
                "piece from, followed by a comma, followed by the chess board square the " \
                "Computer should move its piece to. " \
                "Please enclose the answer between brackets ('[]'), like in my previous example. " \
                " '[c7, c6]' or '[h1,f3]' are acceptable answer formats.  " \
                " Do not nest brackets. " \
                "For example, please do not format the response like '[[h1,f3]]'.  Instead " \
                "format the response with only a single set of brackets like '[h1,f3]'."  \
                " Do not enclose your entire answer in brackets.  For example please do not " \
                "respond with [Answer: a3, a4].  Put only the chess board " \
                "squares between brackets."
