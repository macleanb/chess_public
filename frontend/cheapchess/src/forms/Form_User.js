/* This form doesn't submit anything on its own, but instead passes
   data outward to a parent controller, through state setter functions
   I also used code from these sites:
*/

/* External Imports */

/* Internal Imports */
    
const Form_User = (
  { 
    parentRefs,
    parentState
  }
) => {

  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */

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
            <h1><b>{
              parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER
              ?
                "New User Information"
              : "Sign In"}
              </b></h1>
            <br/>
            <parentState.imports.Form id="user-form">
              <parentState.imports.UserInputs
                parentRefs={ parentRefs }
                parentState={ parentState }
              />
              {
                parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER
                ?
                  <parentState.imports.Button
                    className="h-40 w-80 mt-1 mb-1"
                    onClick={ parentState.handleAddUserClicked }
                    variant="primary"
                  >
                    Complete Registration
                  </parentState.imports.Button>
                :
                  parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SIGNIN
                  ?
                    <parentState.imports.Button
                      className="h-40 w-80 mt-1 mb-1"
                      onClick={ parentState.handleSignInClicked }
                      variant="primary"
                    >
                      Sign In
                    </parentState.imports.Button>
                  :''
              }
              {
                parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SIGNIN
                ?
                  <parentState.imports.Button
                    className="button-signup"
                    onClick={ parentState.handleSignUpClicked }
                  >
                    Sign Up
                  </parentState.imports.Button>
                : ''
              }
            </parentState.imports.Form>
          </div>
        :
        ''
      }
    </div>
  )
}
  
export default Form_User;