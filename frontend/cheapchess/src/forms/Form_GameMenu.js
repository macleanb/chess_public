////////////////
///  Imports ///
////////////////

/* External Imports */
import { useContext, useEffect } from 'react';

/* Internal Imports */
import AuthContext from '../contexts/AuthProvider';
import MessageContext from '../contexts/MessageProvider';
import ListOfPlayableGames from '../components/ListOfPlayableGames';

/* This form provides a select component and a button for users
   to create new games */
const Form_GameMenu = ({
  parentState,
}) => 
{

  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */
  const { messages, setMessages } = useContext(MessageContext);
  const { auth, setAuth } = useContext(AuthContext);

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
      <br/>
      {
        auth?.user
        ?
        <h1>Welcome {auth.user.first_name}!</h1>
        : ''
      }
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
              <div className="d-flex justify-content-start mt-2 ms-4">
                <parentState.imports.Form.Label className="me-4"><b>Play against computer?</b></parentState.imports.Form.Label>
                <parentState.imports.Form.Check
                  className=""
                  autofocus
                  type="checkbox"
                  name="playComputerCheckbox"
                  onChange= {(e) => { 
                    parentState.setIsComputerOpponent(e.target.checked) 
                  }}
                  checked={ parentState.isComputerOpponent ? parentState.isComputerOpponent : false }
                />
              </div>
            </parentState.imports.Form.Group>
            <ListOfPlayableGames parentState = { parentState } /> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <parentState.imports.Button
              className="button-signout"
              onClick={ parentState.handleSignOutClicked }
            >
              Sign Out
            </parentState.imports.Button>
          </parentState.imports.Form>
        :
          ''
      }
    </div>
  );
}

export default Form_GameMenu;