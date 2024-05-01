/* External Imports */
import { useEffect, useState } from 'react';

/* Internal Imports */
import makeMove from "../utils/board_MakeMove";

/* This component represents a chessboard */
const Board = (
  {
    parentState
  }) => 
{
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Store possible moves once received from API */
  const [ possibleMoves, setPossibleMoves ] = useState();

  const [ shakeError, setShakeError ] = useState(false)

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  /* Get and display possible moves when a piece is clicked */
  const handlePieceClicked = async (e, pieceData) => {
    e.preventDefault();
    /* We DO want to propagate the click event to the square */
    // e.stopPropagation();
  };

  /* Handle click behavior for square components */
  const handleSquareClicked = async (e, squareData) => {
    e.preventDefault();
    e.stopPropagation();
  
    
    /* If the game isnt' started yet, pop up a message to the user */
    if ( 
      !parentState.gameDataFromServer ||
      parentState.gameDataFromServer?.game_status === 'not_started'
      )
    {
      parentState.setMessages({'Error' : "The game hasn't started yet!  You may need to login first or allow another player to join..."});
    }
    /* If it isn't our turn, pop up a message to the user */
    else
     if (
      parentState.gameDataFromServer?.whose_turn &&
      parentState.gameDataFromServer.whose_turn.id !== parentState.auth.user.id
      )
    {
      parentState.setMessages({'Nice try' : 'wait your turn!'});
    /* It IS our turn.  Perform additional validation */
    } else {
      const userIsPlayer1 = parentState.gameDataFromServer.player1.id === parentState.auth.user.id;
      const playerColor = userIsPlayer1
                          ?
                            parentState.gameDataFromServer.player1_color
                          : parentState.gameDataFromServer.player2_color;

      /* First determine whether the user is attempting to select
         an origin square */
      if (parentState.selectedOriginSquare === squareData) {
        /* Deselect the square if its already selected */
        parentState.setSelectedOriginSquare(null);
      } else if (
        /* Change selectedOriginSquare if a different square with
            our piece was just clicked */
        squareData.piece &&
        squareData.piece.color === playerColor
      ) {
        /* Only select an origin square if it has a user's piece in it */
        parentState.setSelectedOriginSquare(squareData);//select the square
      } else {
        /* Player is trying to make a move */
        const moveIsValid = parentState.imports.isValidMove(
          squareData
        );
    
        if (moveIsValid) {
          const response = await makeMove(
            /* Pass in gameID */
            parentState.gameDataFromServer.id,
            parentState.selectedOriginSquare.piece.id,
            squareData.file + squareData.rank,
            parentState.iconData,
            parentState.setGameDataFromServer,
            parentState.setMessages
          );
        } else if (
          parentState.selectedOriginSquare && // user may be attempting to make an invalid move
          (
            squareData.piece === null || // an attempt was made to move to an empty square
            squareData.piece.color !== playerColor // an attempt was made to capture opponent piece
          )
          ) {
          // parentState.setMessages({'Nice try' : "you can't move there...or maybe you can...but OpenAI isn't always right!"});
        }
      }
    }
  };

  ///////////////////
  /// Use Effects ///
  ///////////////////

  /* Whenever selectedOriginSquare changes, update possible moves */
  useEffect(() => {
    /* Only reset highlighted squares if parentState.boardData is not null */
    if (parentState.boardData) {
      /* Restore any highlighted squares to their original color.  This
       is needed for both square deselection and selecting a different
       square */
      const tempBoardData = [...parentState.boardData]; // copy boardData
      for (const highlightedSquare of parentState.highlightedSquares) {
        const squareData = parentState.imports.getSquareData(
          tempBoardData,
          highlightedSquare.square,
          parentState.playerColor
        );
        squareData.color = highlightedSquare.originalColor;
      }

      parentState.setBoardData(tempBoardData);
      parentState.setHighlightedSquares([]);
    }
  
    /* If a square has been selected, get possible moves for that square */
    if (
      parentState.selectedOriginSquare &&
      parentState.selectedOriginSquare.piece &&
      parentState?.imports?.apiGetPossibleMoves
      ) 
    {
      /* Get the piece data from the selected square */
      const pieceData = parentState.selectedOriginSquare.piece;

      /* Set local state to track the reference square that possible
          moves will be requested for */
      const referenceOriginSquare = parentState.selectedOriginSquare;

      /* Create 'active' variable for clean-up up purposes */
      let active = true;

      const getPossibleMoves = async () => {
        const newPossibleMoves = await parentState.imports.apiGetPossibleMoves(
          pieceData.color,
          pieceData.first_move_made,
          pieceData.current_file,
          pieceData.current_rank,
          pieceData.piece_type
        );

        if (active && newPossibleMoves) {
          setPossibleMoves({
            referenceOriginSquare : referenceOriginSquare,
            moves : newPossibleMoves
          });
        }
      };

      getPossibleMoves();
    } else {
      /* If selectedOriginSquare is null or if there is no piece on
         the selected square, set possibleMoves to null */
      setPossibleMoves(null);
    }
  }, [parentState?.selectedOriginSquare]);

  /* Whenever possibleMoves changes, highlight appropriate squares */
  useEffect(() => {
    /* Check to ensure the referenceSquare hasn't been deselected by
        the time a promise resolves or selected to a different square.
        If it has been deselected or changed, do nothing. */
    if (
      parentState.boardData &&
      possibleMoves &&
      parentState.selectedOriginSquare &&
      parentState.selectedOriginSquare === possibleMoves.referenceOriginSquare
      )
    {
      /* Copy boardData before updating state */
      const tempBoardData = [...parentState.boardData];

      /* Get the piece data from the selected square */
      const pieceData = parentState.selectedOriginSquare.piece;

      const userIsPlayer1 = parentState.gameDataFromServer.player1.id === parentState.auth.user.id;
      const playerColor = userIsPlayer1
                          ?
                            parentState.gameDataFromServer.player1_color
                          : parentState.gameDataFromServer.player2_color;

      /* For each square in possible moves, color the square on our
      board green IF there isn't already a piece on it */
      const newHighlightedSquares = [];
      const selectedPiecesSquare = pieceData.current_file + pieceData.current_rank;
      for (const possibleMoveSquare of possibleMoves.moves) {
        const possibleMoveSquareData = parentState.imports.getSquareData(
          tempBoardData,
          possibleMoveSquare,
          parentState.playerColor
          );

        /* Before highlighting, make sure there is no piece that
           belongs to the user on a possible move square, AND that
           there are no pieces between the selected piece and the
           possible move square (unless the selected piece is a knight) */
        if (
          (
            possibleMoveSquareData.piece === null ||
            possibleMoveSquareData.piece.color !== playerColor
          )

          &&

          (
            !parentState.imports.pieceExistsBetweenTwoSquares(
              tempBoardData,
              selectedPiecesSquare,
              possibleMoveSquare,
              parentState.playerColor
              ) ||
            pieceData.piece_type === 'knight'
          )
        )
        {
          const originalSquareColor = possibleMoveSquareData.color;
          possibleMoveSquareData.color = 'greensquare';
  
          newHighlightedSquares.push({
            square         : possibleMoveSquare,
            originalColor  : originalSquareColor
          });
        }
      }

      /* Keep track of highlighted squares for constant-time lookup */
      parentState.setHighlightedSquares(newHighlightedSquares);
      parentState.setBoardData(tempBoardData);
    }
  }, [possibleMoves]);

  useEffect(() => {
    if (shakeError) {
      setTimeout(() => 
        setShakeError(false), 1000
      )
    }
  }, [shakeError])

  //////////////
  /// Render ///
  //////////////

  return (
    <div>
      {
        parentState?.imports
        ?
          <parentState.imports.Container className={ `board` }>
            {
              parentState?.boardData
              ?
                parentState.boardData.map((row, rowIndex) => {
                  return (
                    <parentState.imports.Row className="row gx-0" key={ rowIndex }>
                      {
                        row.map((squareData, colIndex) => {
                          return (
                            <parentState.imports.Col className="column" key={ colIndex }>
                              <parentState.imports.Square parentState={{
                                ...parentState,
                                squareData          :   squareData,
                                handlePieceClicked  :   handlePieceClicked,
                                handleSquareClicked :   handleSquareClicked,
                                shouldIShake        :   shakeError && parentState?.selectedOriginSquare.piece === squareData.piece
                              }}/>
                            </parentState.imports.Col>
                          )
                        })
                      }
                    </parentState.imports.Row>
                  )
                })
              : ''
            }
          </parentState.imports.Container>
        : 'Loading page...'
      }
    </div>
  );
}

export default Board;
   
   