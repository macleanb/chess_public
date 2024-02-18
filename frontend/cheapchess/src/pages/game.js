/* External Libraries */
import React, { useContext, useEffect, useState } from 'react';

/* Internal Libraries */
import MessageContext from '../contexts/MessageProvider';

const Game = (
  {
    appState
  }) =>
{
  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */
  const { messages, setMessages } = useContext(MessageContext);

  /* State Declarations */
  /* boardData is a 2D array containing a single squareData object in
     each element.  This array will be passed to a html component for 
     display, with the top rows holding the opponent's pieces and the 
     bottom rows holding the player's pieces.  If the player's color
     is light, the lower rows will hold ranks 1 & 2, and the left
     column will correspond to file 'a'.  But if the player's color is
     dark, the lower rows will hold ranks 7-8 and the left colum will
     correspond with to file 'h'.  For this reason, do not access
     boardData directly unless absolutely necessary.  Instead use the
     convenience util function square_getSquareData() along with
     the various mappings of ranks and files to rows and cols in the
     constants file. */
  const [ boardData, setBoardData ] = useState(null);

  /* An array that keeps track of any squares that are highlighted
     with a color different from their original color. */
  const [ highlightedSquares, setHighlightedSquares ] = useState([]);

  /* TODO: Update to pieceData */
  const [ iconData, setIconData ] = useState();

  /* TODO: Update with color selected by player */
  const [ playerColor, setPlayerColor ] = useState('light');

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  const handlePieceClicked = async (e, pieceData) => {
    e.preventDefault()
    e.stopPropagation();

    if (appState?.imports?.apiGetPossibleMoves) {
      const response = await appState.imports.apiGetPossibleMoves(
        pieceData.color,
        pieceData.firstMoveMade,
        pieceData.currentFile,
        pieceData.currentRank,
        pieceData.type
      );

      /* Restore any highlighted squares to their original color */
      const tempBoardData = [...boardData]; // copy boardData
      for (const highlightedSquare of highlightedSquares) {
        const squareData = appState.imports.getSquareData(
          tempBoardData,
          highlightedSquare.square,
          playerColor
        );
        squareData.color = highlightedSquare.originalColor;
      }

      /* For each square in the response (possible moves),
         color the square on our board green IF there isn't
         already a piece on it */
      const newHighlightedSquares = [];
      for (const responseSquare of response) {
        const selectedPiecesSquare = pieceData.currentFile + pieceData.currentRank;
        const boardSquareData = appState.imports.getSquareData(
          tempBoardData,
          responseSquare,
          playerColor
          );

        /* Make sure there is no piece before highlighting */
        if (
          boardSquareData.piece === null &&
          !appState.imports.pieceExistsBetweenTwoSquares(
            tempBoardData,
            selectedPiecesSquare,
            responseSquare,
            playerColor
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

      setBoardData(tempBoardData);
      setHighlightedSquares(newHighlightedSquares);
    }
  };

  /////////////////
  /* Use Effects */
  /////////////////

  /* Get Icon Data once board is initialized page load */
  useEffect(() => {
    if (!iconData && appState?.imports) {
      appState.imports.getIcons().then((result) => {      
        if (result) {
          /* Before setting the result, convert it to a dict
             using each value of the icon data's name field as the key */
          const objResult = appState.imports.convertArrayToDict(
            result,
            appState.imports.constants.FIELD_NAME_ICON_NAME
            );
          setIconData(objResult);
        }
      });
    }
  }, []); // shouldn't need to watch appState?.imports

  /* Once icons have been received from icon server, initialize
     boardData. */
  useEffect(() => {
    if (
      iconData &&
      playerColor &&
      boardData === null // Don't overwrite boardData if it isn't null
      )
    {
      const initializedBoardData = appState.imports.initializeBoardData(
        iconData,
        playerColor
        );
      setBoardData(initializedBoardData);
    }
  }, [iconData, playerColor]);

  // For troubleshooting: prints boardData whenever it changes
  // useEffect(() => {
  //   console.log(`here in game, board data updated!`);
  //   if (Array.isArray(boardData)) {
  //     for (const row of boardData) {
  //       for (const squareData of row) {
  //         console.log(`Square: ${JSON.stringify(squareData)}`);
  //       }
  //     }
  //   }

  // }, [boardData]);


  ////////////
  /* Render */
  ////////////

  return (
    <div>
    {
      appState.imports
      ?
        <div>
          <appState.imports.MessageDisplay />
          <appState.imports.Board parentState={{
            ...appState,
            boardData          : boardData,
            handlePieceClicked : handlePieceClicked,
          }}/>
          <div>
            Board icons sourced from:
            <div>
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a> (Dark Knight)
              <a href="https://www.flaticon.com/free-icons/pawn" title="pawn icons">Pawn icons created by VectorPortal - Flaticon</a> (Dark Pawn, Light Pawn)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by deemakdaksina - Flaticon</a> (Dark Rook, Light Rook, Dark King)
              <a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by Freepik - Flaticon</a> (Dark Bishop, Light King)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by Victoruler - Flaticon</a> (Dark Queen, Light Queen)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by SBTS2018 - Flaticon</a> (Light Knight)
              <a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by rizal2109 - Flaticon</a> (Light Bishop)
            </div>
          </div>
        </div>
      : 'Imports not loaded...'
    }
    </div>
  );
}

export default Game;
