////////////////
///  Imports ///
////////////////

/* External Imports */

/* Internal Imports */

/* This form provides controls for playing chess games */
const GameControlsForm = ({
  parentState,
}) => 
{

  ///////////////////////
  ///   Use Effects   ///
  ///////////////////////

  //////////////////
  ///   Render   ///
  //////////////////

  return (
    <div className="new-game-form-container">
      <br/>
      <h1><b>Game Controls</b></h1>
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

export default GameControlsForm;