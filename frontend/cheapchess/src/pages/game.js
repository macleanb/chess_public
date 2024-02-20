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

  /* A JSON object received from the game server */
  const [ gameDataFromServer, setGameDataFromServer ] = useState();

  /* An array that keeps track of any squares that are highlighted
     with a color different from their original color. */
  const [ highlightedSquares, setHighlightedSquares ] = useState([]);

  /* Stores iconData (including images) for chess pieces */
  const [ iconData, setIconData ] = useState();

  /* Stores color selected by player */
  const [ playerColor, setPlayerColor ] = useState('light');

  /* Holds state for the selected color option in NewGameForm */
  const [ selectedColorOptionInColorOptionSelect, setSelectedColorOptionInColorOptionSelect ] = useState();

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  /* Make an API call to create a game on backend, then populate the
     boardData with pieces from the backend server */
  const handleNewGameClicked = async (e) => {
    const formData = {}

    if ((
          selectedColorOptionInColorOptionSelect === 0 ||
          selectedColorOptionInColorOptionSelect === 1
        ) && appState.imports.constants
      ) {

      const selectedColor = appState.imports.constants.COLOR_OPTIONS[selectedColorOptionInColorOptionSelect].color;
      
      formData['player1Color'] = selectedColor;
    } else {
      formData['player1Color'] = appState.imports.constants.COLOR_PIECE_LIGHT;
    }
    const newGameData = await appState.imports.newGame(formData, setMessages);

    /* For some reason the backend PieceSerializer wouldn't include full (absolute)
       file paths for icons, so we update those here */
    if (iconData) {
      for (const square of Object.keys(newGameData.pieces)) {
        const newGamePieceData = newGameData.pieces[square];
        const iconKey = newGamePieceData.color + newGamePieceData.piece_type;
        const directIconData = iconData[iconKey];
        newGamePieceData.fk_icon = directIconData;
      }
    }

    /* Update playerColor state */
    setPlayerColor(formData['player1Color']);

    /* Update gameDataFromServer state */
    setGameDataFromServer(newGameData);
  }

  /* Get and display possible moves when a piece is clicked */
  const handlePieceClicked = async (e, pieceData) => {
    e.preventDefault()
    e.stopPropagation();

    if (appState?.imports?.apiGetPossibleMoves) {
      const response = await appState.imports.apiGetPossibleMoves(
        pieceData.color,
        pieceData.first_move_made,
        pieceData.current_file,
        pieceData.current_rank,
        pieceData.piece_type
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
      const selectedPiecesSquare = pieceData.current_file + pieceData.current_rank;
      for (const responseSquare of response) {
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

  /* Get Icon Data once page is loaded */
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

  /* Once player color has been set, initialize boardData. */
  useEffect(() => {
    if (
      playerColor &&
      boardData === null // Don't overwrite boardData if it isn't null
      )
    {
      const initializedBoardData = appState.imports.initializeBoardData(playerColor);
      setBoardData(initializedBoardData);
    }
  }, [playerColor]);

  /* Whenever gameDataFromServer changes, update boardData (will update UI). */
  useEffect(() => {
    if (
      gameDataFromServer &&
      boardData &&
      boardData !== null &&
      playerColor
      )
    {

    const updatedBoardData = appState.imports.updateBoardDataWithFetchedPieces(
      boardData,
      gameDataFromServer,
      playerColor,
    );

    /* Update boardData state */
    setBoardData(updatedBoardData);
    }
  }, [gameDataFromServer, playerColor]);

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
          <div className="game-main-container">
              <appState.imports.NewGameForm parentState={{
                ...appState,
                handleNewGameClicked                        : handleNewGameClicked,
                handlePieceClicked                        : handlePieceClicked, 
                selectedColorOptionInColorOptionSelect      : selectedColorOptionInColorOptionSelect,
                setSelectedColorOptionInColorOptionSelect   : setSelectedColorOptionInColorOptionSelect,
              }}/>
              <appState.imports.Board parentState={{
                ...appState,
                boardData          : boardData,
                handlePieceClicked : handlePieceClicked,
              }}/>
          </div>
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
