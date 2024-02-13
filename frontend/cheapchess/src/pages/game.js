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
  //const { imports } = useContext(ImportContext);
  const { messages, setMessages } = useContext(MessageContext);

  /* State Declarations */

  /* Other Declarations */
  const navigate = useNavigate();

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  /////////////////
  /* Use Effects */
  /////////////////

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
          <h1>Welcome to CheapChess!</h1>
          <br/>
          <appState.imports.Board parentState={ appState }/>
        </div>
      : 'Imports not loaded...'
    }
    </div>
  );
}

export default Game;
