/* External Libraries */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal Libraries */
//import ImportContext from '../contexts/ImportProvider';
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
  const [ boardData, setBoardData ] = useState(null);
  const [ iconData, setIconData ] = useState();

  /* Other Declarations */
  const navigate = useNavigate();

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  const handlePieceClicked = async (e, pieceData) => {
    e.preventDefault()
    e.stopPropagation();
    const pieceDescription = pieceData?.description ? pieceData.description : 'some piece';

    if (appState?.imports?.apiGetPossibleMoves) {
      const response = await appState.imports.apiGetPossibleMoves(
        'some board description',
        pieceDescription
      );

      console.log(`A piece was clicked in game: ${ JSON.stringify(response) }`);
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

  /* Initialize OpenAI API tools after page load */
  // useEffect(() => {
  //   if (appState?.imports) {
      
  //     const apiKey = appState.imports.openAIKey;
  //     // test
  //     console.log(`Here in   game.js 0: open AI key:  ${ appState.imports.openAIKey }`);

  //     appState.imports.postOpenAIRequest('Hello!  Please say "good test."', apiKey).then((response) => {
  //       // test
  //       console.log(`Here in   game.js 1: open AI response:  ${ JSON.stringify(response) }`);
  //     });
  //   }
  // }, [appState?.imports]);

  /* Once icons have been received from icon server, initialize
     boardData. */
  useEffect(() => {
    if (iconData && boardData === null) { // Don't overwrite boardData if it isn't null
      const initializedBoardData = appState.imports.initializeBoardData(iconData);
      setBoardData(initializedBoardData);
    }
  }, [iconData]);


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
