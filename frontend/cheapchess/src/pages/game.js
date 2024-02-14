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
  }, [appState?.imports]);

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
            boardData : boardData,
          }}/>
          <div>
            Board icons sourced from:
            <div>
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a> (Dark Rook)
            </div>
          </div>
        </div>
      : 'Imports not loaded...'
    }
    </div>
  );
}

export default Game;
