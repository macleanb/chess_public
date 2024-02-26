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

  /////////////////////////
  ///   Event Handlers  ///
  /////////////////////////

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SIGNIN) {
        parentState.handleSignInClicked(null);
      } else if (parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER) {
        parentState.handleAddUserClicked(null);
      }
    }
  };

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
            {
              parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SIGNIN
              ?
                <div>
                  <br/>
                  <h1><b>CheapChess</b></h1>
                  <br/>
                  "The leading free chess tutor that leverages AI technology for guided, experiential learning."
                  <br/>
                           - Unattributed Author
                  <br/>
                  <br/>
                  <p className="intro-paragraph">
                     Welcome to CheapChess, where beginners who don't want to pay the high cost of exquisite chess tutors can settle for the best
                    that artificial intelligence can offer.  Of course, large-language models (LLMs) aren't perfect - they can be slow, and they
                    can be wrong.  But, as beginners to the game of chess, we aren't aiming for perfect.  Mediocrity is just fine with us --
                    as long as we have fun, and save some cash!
                  </p>
                  <br/>
                  <br/>
                </div>
              : ''
            }
            <br/>
            <h1><b>{
              parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER
              ?
                "New User Information"
              : ''}
            </b></h1>
            <br/>
            <parentState.imports.Form id="user-form" onKeyDown={ handleKeyDown }>
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