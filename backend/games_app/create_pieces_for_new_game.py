""" This function creates new pieces for a chess game """

# Internal Imports
from icons_app.models import Icon
from .models import Piece

def create_piece(
        color,
        file,
        game,
        icon,
        rank,
        type
        ):
    """ Returns a piece with the given args """
    piece = Piece(
        color=color,
        current_file=file,
        current_rank=rank,
        fk_icon=icon,
        fk_game=game,
        on_board=True,
        piece_type=type,
        starting_file=file,
        starting_rank=rank,
    )
    piece.save()
    return piece

def create_pieces_for_new_game(game):
    """ Creates new pieces for a chess game """
    pieces = []

    # light rooks
    icon = Icon.objects.filter(name='lightrook').first()

    # square a1
    a1_rook = create_piece(
        color='light',
        file='a',
        game=game,
        icon=icon,
        rank='1',
        type='rook'
    )
    pieces.append(a1_rook)

    # square h1
    h1_rook = create_piece(
        color='light',
        file='h',
        game=game,
        icon=icon,
        rank='1',
        type='rook'
    )
    pieces.append(h1_rook)

    # light knights
    icon = Icon.objects.filter(name='lightknight').first()

    # square b1
    b1_knight = create_piece(
        color='light',
        file='b',
        game=game,
        icon=icon,
        rank='1',
        type='knight'
    )
    pieces.append(b1_knight)

    # square g1
    g1_knight = create_piece(
        color='light',
        file='g',
        game=game,
        icon=icon,
        rank='1',
        type='knight'
    )
    pieces.append(g1_knight)

    # light bishops
    icon = Icon.objects.filter(name='lightbishop').first()

    # square c1
    c1_bishop = create_piece(
        color='light',
        file='c',
        game=game,
        icon=icon,
        rank='1',
        type='bishop'
    )
    pieces.append(c1_bishop)

    # square f1
    f1_bishop = create_piece(
        color='light',
        file='f',
        game=game,
        icon=icon,
        rank='1',
        type='bishop'
    )
    pieces.append(f1_bishop)

    # light queen
    icon = Icon.objects.filter(name='lightqueen').first()

    # square d1
    d1_queen = create_piece(
        color='light',
        file='d',
        game=game,
        icon=icon,
        rank='1',
        type='queen'
    )
    pieces.append(d1_queen)

    # light king
    icon = Icon.objects.filter(name='lightking').first()

    # square e1
    e1_king = create_piece(
        color='light',
        file='e',
        game=game,
        icon=icon,
        rank='1',
        type='king'
    )
    pieces.append(e1_king)

    # light pawns
    icon = Icon.objects.filter(name='lightpawn').first()

    for file in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']:
        pawn = create_piece(
            color='light',
            file=file,
            game=game,
            icon=icon,
            rank='2',
            type='pawn'
            )
        pieces.append(pawn)

    # dark rooks
    icon = Icon.objects.filter(name='darkrook').first()

    # square a8
    a8_rook = create_piece(
        color='dark',
        file='a',
        game=game,
        icon=icon,
        rank='8',
        type='rook'
    )
    pieces.append(a8_rook)

    # square h8
    h8_rook = create_piece(
        color='dark',
        file='h',
        game=game,
        icon=icon,
        rank='8',
        type='rook'
    )
    pieces.append(h8_rook)

    # dark knights
    icon = Icon.objects.filter(name='darkknight').first()

    # square b8
    b8_knight = create_piece(
        color='dark',
        file='b',
        game=game,
        icon=icon,
        rank='8',
        type='knight'
    )
    pieces.append(b8_knight)

    # square g8
    g8_knight = create_piece(
        color='dark',
        file='g',
        game=game,
        icon=icon,
        rank='8',
        type='knight'
    )
    pieces.append(g8_knight)

    # dark bishops
    icon = Icon.objects.filter(name='darkbishop').first()

    # square c8
    c8_bishop = create_piece(
        color='dark',
        file='c',
        game=game,
        icon=icon,
        rank='8',
        type='bishop'
    )
    pieces.append(c8_bishop)

    # square f8
    f8_bishop = create_piece(
        color='dark',
        file='f',
        game=game,
        icon=icon,
        rank='8',
        type='bishop'
    )
    pieces.append(f8_bishop)

    # dark queen
    icon = Icon.objects.filter(name='darkqueen').first()

    # square d8
    d8_queen = create_piece(
        color='dark',
        file='d',
        game=game,
        icon=icon,
        rank='8',
        type='queen'
    )
    pieces.append(d8_queen)

    # dark king
    icon = Icon.objects.filter(name='darkking').first()

    # square e8
    e8_king = create_piece(
        color='dark',
        file='e',
        game=game,
        icon=icon,
        rank='8',
        type='king'
    )
    pieces.append(e8_king)

    # dark pawns
    icon = Icon.objects.filter(name='darkpawn').first()

    for file in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']:
        pawn = create_piece(
            color='dark',
            file=file,
            game=game,
            icon=icon,
            rank='7',
            type='pawn'
            )
        pieces.append(pawn)

    return pieces
