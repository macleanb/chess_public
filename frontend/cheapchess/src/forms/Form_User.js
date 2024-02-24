/* This form doesn't submit anything on its own, but instead passes
   data outward to a parent controller, through state setter functions
   I also used code from these sites:
*/

/* External Imports */
import { useContext } from 'react';

/* Internal Imports */
import AuthContext from '../contexts/AuthProvider';
import { userIsAuthorized } from '../utils/authUtils';
    
const Form_User = (
  { 
    parentState
  }
) => {

  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */
  const { auth } = useContext(AuthContext);
  

  ////////////////
  ///  Render  ///
  ////////////////

  return (
    <div className="form-container">
      {
        parentState?.imports?.Button &&
        parentState.imports.constants &&
        parentState.imports.Form
        ?
          <div>
            <br/>
            <h1><b>{"New User Information"}</b></h1>
            <br/>
            <parentState.imports.Form id="user-form">
              <parentState.imports.UserInputs
                parentState={ parentState }
                parentRefs={ parentRefs }
              />
              <parentState.imports.ImageInput
                parentState={ parentState }
              />
              <parentState.imports.Button variant="primary" className="h-40 w-80 mt-1 mb-1" onClick={ handleAddUserClicked }>
                Complete Registration
              </parentState.imports.Button>
            </parentState.imports.Form>
          </div>
        :
        ''
      }
    </div>
  )
}
  
export default Form_User;