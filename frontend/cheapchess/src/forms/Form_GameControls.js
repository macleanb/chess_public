////////////////
///  Imports ///
////////////////

/* External Imports */

/* Internal Imports */
import ChatBox from '../components/ChatBox';
/* This form provides controls for playing chess games */
import React from 'react';

const Form_GameControls = ({
  parentState
}) => {

  const onMessageSubmit = (message) => {
    console.log(message);
  };


  ///////////////////////
  ///   Use Effects   ///
  ///////////////////////

  //////////////////
  ///   Render   ///
  //////////////////

  return (
    <div className="form-container">
      <br/>
      <h1><b>Game Controls</b></h1>
      <br/>
      <div>
        {
          parentState?.gameDataFromServer?.player1?.first_name &&
          parentState?.gameDataFromServer?.game_type === 'HUMAN V. HUMAN'
          ?
            <h5>{`Player 1: ${parentState.gameDataFromServer.player1.first_name}`}</h5>
          :
            <h5>{`Player 1: Open`}</h5>
        }
        {
          parentState?.gameDataFromServer?.player2?.first_name &&
          parentState?.gameDataFromServer?.game_type === 'HUMAN V. HUMAN'
          ?
            <h5>{`Player 2: ${parentState.gameDataFromServer.player2.first_name}`}</h5>
          :
            <h5>{`Player 2: Open`}</h5>
        }
        {
          parentState?.gameDataFromServer?.player1?.first_name &&
          parentState?.gameDataFromServer?.game_type === 'HUMAN V. COMPUTER' &&
            <>
              <h5>{`Player 1: ${parentState.gameDataFromServer.player1.first_name}`}</h5>
              <h5>{`Player 2: Computer`}</h5>
            </>
        }
        {
          parentState?.gameDataFromServer?.player2?.first_name &&
          parentState?.gameDataFromServer?.game_type === 'HUMAN V. COMPUTER' &&
            <>
              <h5>{`Player 1: Computer`}</h5>
              <h5>{`Player 2: ${parentState.gameDataFromServer.player2.first_name}`}</h5>
            </>
        }
        {
          parentState?.gameDataFromServer?.whose_turn && parentState.gameDataFromServer?.player2
          ?
            <h5>{`It's ${parentState.gameDataFromServer.whose_turn.first_name}'s turn`}</h5>
          :
            <h5>{`Waiting for opponent to join...`}</h5>
        }
        {  //for when it's the computer's turn
          parentState?.gameDataFromServer?.whose_turn == null && parentState.gameDataFromServer?.game_type === 'HUMAN V. COMPUTER'
          ?
            <h5>{"It's the Computer's turn"}</h5>
          :  //for when it's a human's turn
            <h5>{`It's your turn to move`}</h5>
        }
      </div>
      <br/>
      {
        parentState?.hasOwnProperty('handleSuggestMoveClicked') &&
        parentState?.hasOwnProperty('handleQuitGameClicked') &&
        parentState?.imports?.Button &&
        parentState.imports.constants &&
        parentState.imports.Form
        ?
          <parentState.imports.Form id="game-controls-form">
            <parentState.imports.Form.Group className="mb-3 ms-1 me-1 text-start">
              <div className="d-flex justify-content-around">
                <parentState.imports.Button variant="primary" className="h-40 w-80 mt-1 mb-1" onClick={ parentState.handleSuggestMoveClicked }>
                  Suggest Move
                </parentState.imports.Button>
              </div>
              <div className="d-flex justify-content-around">
                <parentState.imports.Button variant="primary" className="h-40 w-80 mt-1 mb-1" onClick={ parentState.handleToggleFileRankLabelsClicked }>
                  {`
                    ${
                      parentState.showFileRankLabels
                      ?
                        'Hide '
                      : 'Show '
                    }
                    File/Rank Labels
                  `}
                </parentState.imports.Button>
              </div>
              <div className="d-flex justify-content-around mt-2 mb-2">
                <parentState.imports.Form.Check
                  className=""
                  type="checkbox"
                  name="usePythonChessCheckbox"
                  label="Use Python Chess for Possible Moves"
                  onChange={ parentState.onPythonChessCheckboxChange }
                  checked={ parentState?.usePythonChessForPossibleMoves ? parentState?.usePythonChessForPossibleMoves : false }
                />
              </div>
              {/* ChatBox inserted here */}
              <div className="d-flex justify-content-around mt-2">
                <ChatBox
                    onMessageSubmit={onMessageSubmit}
                    userName={ parentState?.auth?.user?.first_name }
                />
              </div>
              <div className="d-flex mt-5 justify-content-around">
                <parentState.imports.Button variant="primary" className="h-40 w-80 mt-1 mb-1" onClick={ parentState.handleQuitGameClicked }>
                  Quit Game
                </parentState.imports.Button>
              </div>
            </parentState.imports.Form.Group>
          </parentState.imports.Form>
        :
          ''
      }
    </div>
  );
}

export default Form_GameControls;