# External Imports
from django.db import models
import datetime
from django.utils import timezone

# Internal Imports
from icons_app.models import Icon

class Game(models.Model):
    """ A class for managing chess games """
    player1 = models.CharField(  # later: player model
        max_length=200,
        blank=True,
        null=True
        )

    player2 = models.CharField( # later: player model
        max_length=200,
        blank=True,
        null=True
        )

    player1_color = models.CharField(  # later: player model
        max_length=200,
        blank=True,
        null=True
        )

    player2_color = models.CharField( # later: player model
        max_length=200,
        blank=True,
        null=True
        )

    public = models.BooleanField(
        blank=True,
        null=True,
        default=False
        ) # indicates whether others can watch the game

    whose_turn = models.CharField( # player1 or player2
        max_length=200,
        blank=True,
        null=True
        )

    last_turn_datetime = models.DateTimeField(
        blank=True,
        null=True,
        default=None
        )

    created_date = models.DateField(default=datetime.date.today)

    started_datetime = models.DateTimeField(
        blank=True,
        null=True,
        default=None
        )

    ended_datetime = models.DateTimeField(
        blank=True,
        null=True,
        default=None
        )

    game_status = models.CharField( # 'not_started' 'active' 'completed'
        max_length=200,
        blank=True,
        null=True,
        default='not_started'
        )

    game_type = models.CharField( # for future use
        max_length=200,
        blank=True,
        null=True
        )

    game_winner = models.CharField( # player1 or player2
        max_length=200,
        blank=True,
        null=True
        )

    def __repr__(self):
        return self.__str__()

    def __str__(self):
        return f'Game(ID: {self.id} ' \
               f'Player 1: {self.player1} ' \
               f'Player 2: {self.player2}) ' \
               f'Status: {self.game_status} '


class Piece(models.Model):
    """ A class for managing chess pieces """
    color = models.CharField(  # light, dark, etc.
        max_length=200,
        blank=True,
        null=True
        )

    current_file = models.CharField(  # a, b, c...
        max_length=1,
        blank=True,
        null=True
        )

    current_rank = models.CharField(  # 1, 2, 3, etc...
        max_length=1,
        blank=True,
        null=True
        )

    first_move_made = models.BooleanField(
        blank=True,
        null=True,
        default=False
        )

    piece_type = models.CharField(  # rook, pawn, etc
        max_length=200,
        blank=True,
        null=True
        )

    starting_file = models.CharField(  # a, b, c...
        max_length=1,
        blank=True,
        null=True
        )

    starting_rank = models.CharField(  # 1, 2, 3, etc...
        max_length=1,
        blank=True,
        null=True
        )

    fk_icon = models.ForeignKey(
        Icon,
        on_delete=models.CASCADE,
        related_name='pieces',
        blank=True,
        null=True
    )
