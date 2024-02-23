/* This component represents a chessboard */

/* External Imports */

/* Internal Imports */
   
   
const Board = (
  {
    parentState
  }) => 
{
  ////////////////////
  /// Declarations ///
  ////////////////////

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  /* Get and display possible moves when a piece is clicked */
  const handlePieceClicked = async (e, pieceData) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (parentState?.imports?.apiGetPossibleMoves) {
      const response = await parentState.imports.apiGetPossibleMoves(
        pieceData.color,
        pieceData.first_move_made,
        pieceData.current_file,
        pieceData.current_rank,
        pieceData.piece_type
      );

      /* Restore any highlighted squares to their original color */
      const tempBoardData = [...parentState.boardData]; // copy boardData
      for (const highlightedSquare of parentState.highlightedSquares) {
        const squareData = parentState.imports.getSquareData(
          tempBoardData,
          highlightedSquare.square,
          parentState.playerColor
        );
        squareData.color = highlightedSquare.originalColor;
      }

      /* For each square in the response (possible moves),
         color the square on our board green IF there isn't
         already a piece on it */
      const newHighlightedSquares = [];
      const selectedPiecesSquare = pieceData.current_file + pieceData.current_rank;
      for (const responseSquare of response) {
        const boardSquareData = parentState.imports.getSquareData(
          tempBoardData,
          responseSquare,
          parentState.playerColor
          );

        /* Make sure there is no piece before highlighting */
        if (
          boardSquareData.piece === null &&
          !parentState.imports.pieceExistsBetweenTwoSquares(
            tempBoardData,
            selectedPiecesSquare,
            responseSquare,
            parentState.playerColor
            )
          ) {
          const originalSquareColor = boardSquareData.color;
          boardSquareData.color = 'greensquare';
  
          newHighlightedSquares.push({
            square         : responseSquare,
            originalColor  : originalSquareColor
          });
        }
      }

      parentState.setBoardData(tempBoardData);
      parentState.setHighlightedSquares(newHighlightedSquares);
    }
  };

  ///////////////////
  /// Use Effects ///
  ///////////////////

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
                                squareData         :   squareData,
                                handlePieceClicked :   handlePieceClicked,
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
   
   