////////////////
///  Imports ///
////////////////

/* External Imports */
import { useEffect } from 'react';

/* Internal Imports */

/* This form provides a select component and a button for users
   to create new games */
const Form_Game = ({
  parentState,
}) => 
{

  ///////////////////////
  ///   Use Effects   ///
  ///////////////////////

  /* Initialize color option select */
  useEffect(() => {
    if (
        parentState?.hasOwnProperty('setSelectedColorOptionInColorOptionSelect') &&
        parentState?.imports?.constants?.COLOR_OPTIONS &&
        parentState.imports.constants.COLOR_OPTIONS.length > 0
        )
    {
      parentState.setSelectedColorOptionInColorOptionSelect(parentState.imports.constants.COLOR_OPTIONS[0].id);
    }
  }, [
    parentState?.setSelectedColorOptionInColorOptionSelect,
    parentState?.imports?.constants?.COLOR_OPTIONS?.length
  ]);

  //////////////////
  ///   Render   ///
  //////////////////

  return (
    <div className="form-container">
      <br/>
      <h1><b>CheapChess</b></h1>
      <br/>
      "The leading free chess tutor that leverages AI technology for guided, experiential learning."
      <br/>
               - Unattributed Author
      <br/>
      <br/>
      Welcome to CheapChess, where beginners who don't want to pay the high cost of exquisite chess tutors can settle for the best
      that artificial intelligence can offer.  Of course, large-language models (LLMs) aren't perfect - they can be slow, and they
      can be wrong.  But, as beginners to the game of chess, we aren't aiming for perfect.  Mediocrity is just fine with us --
      as long as we have fun, and save some cash!
      <br/>
      <br/>
      {
        parentState?.hasOwnProperty('handleNewGameClicked') &&
        parentState?.imports?.Button &&
        parentState.imports.constants &&
        parentState.imports.Form
        /*parentState.setSelectedColorOptionInColorOptionSelect*/
        ?
          <parentState.imports.Form id="new-game-form">
            <parentState.imports.Form.Group className="mb-3 ms-1 me-1 text-start">
              <parentState.imports.Form.Label className="ms-4"><b>Select play color:</b></parentState.imports.Form.Label>
              <div className="d-flex justify-content-around">
                <div className="d-flex flex-wrap shadow playercolorselect">
                  <parentState.imports.Form.Select
                    className="border-0 rounded-0 text-gray-700"
                    aria-label="Select player color"
                    name="player1Color"
                    onChange={ (e) => { 
                      parentState.setSelectedColorOptionInColorOptionSelect(parseInt(e.target.value))
                    }}
                    value={
                      parentState.selectedColorOptionInColorOptionSelect
                      ?
                      parentState.selectedColorOptionInColorOptionSelect
                      :
                        !parentState.imports.constants.COLOR_OPTIONS || parentState.imports.constants.COLOR_OPTIONS.length === 0
                        ?
                          '-1'
                        :
                          parentState.imports.constants.COLOR_OPTIONS[0].id
                    }
                  >
                  {
                    !parentState.imports.constants.COLOR_OPTIONS || parentState.imports.constants.COLOR_OPTIONS.length === 0
                    ?
                      <option value="-1">No color options exist</option>
                    : ''
                  }
                  {
                    parentState.imports.constants.COLOR_OPTIONS && parentState.imports.constants.COLOR_OPTIONS.length > 0
                    ?
                      parentState.imports.constants.COLOR_OPTIONS.map((option) => {
                        return <option key={option.id} value={option.id}>{`${option.color}`}</option>
                      })
                    : ''
                  }
                  </parentState.imports.Form.Select>
                </div>
                {
                  parentState.imports.constants.COLOR_OPTIONS && parentState.imports.constants.COLOR_OPTIONS.length > 0
                  ? 
                    <parentState.imports.Button variant="primary" className="h-40 w-80 mt-1 mb-1" onClick={ parentState.handleNewGameClicked }>
                      New Game
                    </parentState.imports.Button>
                  : ''
                }
              </div>
            </parentState.imports.Form.Group>
          </parentState.imports.Form>
        :
          ''
      }
    </div>
  );
}

export default Form_Game;