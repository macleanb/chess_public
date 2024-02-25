/* External Imports */
import { useContext, useEffect } from 'react';

/* Internal Imports */
import MessageContext from '../contexts/MessageProvider';

/* This component is a flexible-use form manager for
   User, Address, and Residence objects. */
const FormManager = ({
  parentRefs,
  parentState
  }) => 
{

  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */
  const { messages, setMessages } = useContext(MessageContext);


  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  /* Loads selected data into formData from parent state */
  // const loadDataToForm = () => {
  //   if (parentState.selectedData && !dataIsEmpty(parentState.selectedData)) {
  //     const tempData = { ...parentState.selectedData };

  //     /* Update data as needed between selectedData and formData */

  //     /* Since tempData may not contain all fields (i.e. image), preserve
  //       defaults from emptyData() rather than deleting them */
  //     if (parentState.formData) {
  //       parentState.setFormData({...parentState.formData, ...tempData});
  //     }
  //   }
  // }

  ////////////////////////
  ///  Event Handlers  ///
  ////////////////////////

  /* Make an API call to create a game on backend, then populate the
     gameDataFromServer with pieces from the backend server */
  const handleNewGameClicked = async (e) => {
    const form_Data = {}

    if (( // TODO: refactor to just use formData
          parentState.imports.constants &&
          parentState?.selectedColorOptionInColorOptionSelect &&
          (
            parentState.selectedColorOptionInColorOptionSelect === 0 ||
            parentState.selectedColorOptionInColorOptionSelect === 1
          )
        )
      ) {

      const selectedColor = parentState.imports.constants.COLOR_OPTIONS[
        parentState.selectedColorOptionInColorOptionSelect
      ].color;
      
      form_Data['player1Color'] = selectedColor;
    } else {
      form_Data['player1Color'] = parentState.imports.constants.COLOR_PIECE_LIGHT;
    }
    const newGameData = await parentState.imports.newGame(form_Data, setMessages);

    /* For some reason the backend PieceSerializer wouldn't include full (absolute)
        file paths for icons, so we update those here */
    if (parentState.iconData) {
      for (const square of Object.keys(newGameData.pieces)) {
        const newGamePieceData = newGameData.pieces[square];
        const iconKey = newGamePieceData.color + newGamePieceData.piece_type;
        const directIconData = parentState.iconData[iconKey];
        newGamePieceData.fk_icon = directIconData;
      }
    }

    /* Update playerColor state */
    parentState.setPlayerColor(form_Data['player1Color']);

    /* Update gameDataFromServer state */
    parentState.setGameDataFromServer(newGameData);

    /* Notify parent that a new game was created */
    parentState.handleNewGameCreated();
  }

  /* Handle quitting game if they click the Quit Game button */
  const handleQuitGameClicked = () => {
    // Placeholder for quit game logic here

    /* Notify parent that game has been quit */
    if (parentState) {
      parentState.handleGameQuit();
    }
  }

  /* Suggest a move to the user if they click the Suggest Move button */
  const handleSuggestMoveClicked = async (e) => {
    e.preventDefault();

    if (parentState.boardData && parentState.playerColor) {
      const allPieceLocations = parentState.imports.getAllPieceLocations(
        parentState.boardData,
        parentState.playerColor
      );

      if (
        parentState?.imports?.apiGetSuggestedMove &&
        parentState?.playerColor
        ) {
        const response = await parentState.imports.apiGetSuggestedMove(
          parentState.playerColor,
          allPieceLocations
        );

        parentState.handleSuggestedMoveReceived(response);
      }
    }
  }

  /* Handles changes to NewGame Form */
  const onGameNewFormChange = e => {
    if (parentState.imports.constants) {
      const selectedColor = parentState.imports.constants.COLOR_OPTIONS[e.target.value];
      parentState.setFormData({ ...parentState.formData, [e.target.name]: selectedColor });
    }
  }
  
  /* Handles changes to UserForm */
  const onUserFormChange = e => {
    parentState.setFormData({ ...parentState.formData, [e.target.name]: e.target.value });
  }

  /* Adds a user to backend server/database. */
  const handleAddUserClicked = async (e) => {
    e.preventDefault();
    let apiResponse = null;

    /* For later once we have AuthContext working (TODO)*/
    const auth = null;

    /* Check for validation errors and report as needed. */
    const formIsValid = parentState.imports.reportUserFormValidity(
      parentState.formData,
      parentRefs,
      parentState.formMode,
      );

    if (parentState.formData && formIsValid) {
      if (parentState.formMode === parentState.imports.constants.FORM_MODE_USER_ADD) {
        apiResponse = await parentState.imports.addUser( // Administrators adding users
          auth,
          parentState.formData,
          setMessages
        );
      } else if (parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER) {
        apiResponse = await parentState.imports.registerUser( // Users self-registering
          auth,
          parentState.formData,
          setMessages
        );
      }
    }

    
    // test
    console.log(`Here in  formManager handleAddUserClicked  response:   ${ JSON.stringify(  apiResponse  ) }`);
    
    

    //   /* Notify the parent component that the user has been created & reset the form */
    //   if (await apiResponse && !backEndErrors && apiResponse.id) {
    //     const userData = apiResponse;
    //     setFormData(null);
    //     parentHandlers.handleUserCreated(userData);
    //   }
    // }
  }

  /* User login action */
  const handleSignInClicked = async (e) => {
    e.preventDefault();
    let apiResponse = null;

    /* Check for validation errors and report as needed. */
    const formIsValid = parentState.imports.reportUserFormValidity(
      parentState.formData,
      parentRefs,
      parentState.formMode
      );
  
    // test
    console.log(`Here in  FormManager handleSignInClicked formData   ${ JSON.stringify(parentState.formData) }`);
  }

  /* Switch form from login to self-register */
  const handleSignUpClicked = async (e) => {
    e.preventDefault();
  
    parentState.setFormMode(parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER);
  }

  /* Updates the selected user. */
  // const handleUpdateUserClicked = async (event) => {
  //   event.preventDefault();
  //   let apiResponse = null;

  //   /* Check for validation errors and report as needed. */
  //   const formIsValid = reportUserFormValidity(formData, parentRefs);
    
  //   if (formData && formIsValid) {
  //     apiResponse = await updateUser(
  //       auth,
  //       parentState.selectedUserData.id,
  //       formData,
  //       setFrontEndErrors,
  //       setBackEndErrors,
  //       setSuccessMessages
  //     );

  //     /* Notify the parent component that the user has been updated */
  //     if (await apiResponse && !backEndErrors && apiResponse.user?.id) {
  //       const userData = apiResponse;

  //       /* Replace the hashed password received from the API response
  //          with the actual password sent to the server */
  //       if (formData.password && formData.password.length > 0) {
  //         userData.user['password'] = formData.password;
  //       } else {
  //         userData.user['password'] = '';
  //       }

  //       parentHandlers.handleUserUpdated(userData);
  //     }
  //   }
  // }

  /* Deletes the selected user.  Also deletes the user's mailing address
     on the backend, if the user had one. */
  // const handleDeleteUserClicked = async (event) => {
  //   event.preventDefault();
  //   let apiResponse = null;

  //   apiResponse = await deleteUser(
  //     auth,
  //     parentState.selectedUserData.id,
  //     setFrontEndErrors,
  //     setBackEndErrors,
  //     setSuccessMessages
  //   );

  //   /* Reload user data so the UsersDisplay can display it */
  //   if (apiResponse && !backEndErrors) {
  //     setFormData(null);
  //     parentHandlers.handleUserDeleted();
  //   }
  // }

  /////////////////
  /* Use Effects */
  /////////////////

  /* If the formType or formMode changes, set formData to empty for whatever the new formType is */
  useEffect(() => {
    if (parentState?.imports) {
      if (
        parentState.formType === parentState.imports.constants.FORM_TYPE_GAME &&
        parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_NEW_CONTINUE
        )
      {
        parentState.setFormData(parentState.imports.emptyFormData_NewGame());
      } else if (
        parentState.formType === parentState.imports.constants.FORM_TYPE_GAME_CONTROLS &&
        parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_CONTROLS_PLAY
       )
      {
        parentState.setFormData(parentState.imports.emptyFormData_GameControls());
      } else if (
        parentState.formType === parentState.imports.constants.FORM_TYPE_USER
        )
      {
        parentState.setFormData(parentState.imports.emptyFormData_User());
      }
    }
  }, [parentState?.formType, parentState?.formMode]);
  
  /* Whenever a selectedAddr, selectedAnnouncement, selectedPolicy selectedUser, or selectedResidence changes, 
    clear the existing form data first before loading the new data. */
  // useEffect(() => {
  //   if (parentState?.selectedUserData) {
  //     setFormData(emptyUserData());
  //   }
  // }, [parentState?.selectedUserData]);

  /* Ensures existing addrData/announcementData/policyData/userData/residenceData are only loaded only AFTER emptyAddrData()
     (or emptyUserData(), etc.) is completed. */
  // useEffect(() => {
  //   if ((formMode === constants.MODE_USER_UPDATE_DELETE || formMode === constants.MODE_USER_PROFILE) && userDataIsEmpty(formData)) {
  //     loadUserDataToForm();
  //   }
  // }, [formData]);

  //////////////
  /*  Render  */
  //////////////

  if (
    parentState?.formType &&
    parentState?.formMode &&
    parentState?.formData &&
    parentState?.imports &&
    parentState.formType === parentState.imports.constants.FORM_TYPE_GAME && 
    parentState.imports?.formDataIs_NewGame(parentState.formData)
    ) {
    return (
      <parentState.imports.Form_Game parentState={{
        ...parentState,
        handleNewGameClicked     : handleNewGameClicked,
        onGameNewFormChange      : onGameNewFormChange,
      }}/>
    );
  } else if (
    parentState?.formType &&
    parentState?.formMode &&
    parentState?.formData &&
    parentState?.imports &&
    parentState.formType === parentState.imports.constants.FORM_TYPE_GAME_CONTROLS &&
    parentState.imports?.formDataIs_GameControls(parentState.formData)
  ) {
    return (
      <parentState.imports.Form_GameControls parentState={{
        ...parentState,
        handleSuggestMoveClicked     : handleSuggestMoveClicked,
        handleQuitGameClicked        : handleQuitGameClicked,
      }}/>
    );
  } else if (
    parentState?.formType &&
    parentState?.formMode &&
    parentState?.formData &&
    parentState?.imports &&
    parentState.formType === parentState.imports.constants.FORM_TYPE_USER &&
    parentState.imports?.formDataIs_User(parentState.formData)
  ) {
    return (
      <parentState.imports.Form_User
        parentState={{
          ...parentState,
          handleAddUserClicked         : handleAddUserClicked,
          handleSignInClicked          : handleSignInClicked,
          handleSignUpClicked          : handleSignUpClicked,
          onUserFormChange             : onUserFormChange,
        }}
        parentRefs={ parentRefs }
      />
    );
  }

  // if (formType === constants.FORM_TYPE_USER && (formMode === constants.MODE_USER_ADD || formMode === constants.MODE_USER_UPDATE_DELETE) && formDataIsUser()) {
  //   return (
  //     <UserForm
  //       handleAddUserClicked={ handleAddUserClicked }
  //       handleAssignResidencesClicked={ parentHandlers.handleAssignResidencesClicked }
  //       handleClearImageClicked={ handleClearImageClicked }
  //       handleDoneAssigningResidencesClicked={ parentHandlers.handleDoneAssigningResidencesClicked }
  //       handleRemoveResidenceClicked={ handleRemoveResidenceClicked }
  //       handleUpdateUserClicked={ handleUpdateUserClicked }
  //       handleDeleteUserClicked={ handleDeleteUserClicked }
  //       handleSwitchModeToAddClicked={ parentHandlers.handleSwitchUserModeToAddClicked }
  //       handleAddMailingAddressClicked={ () =>
  //         {
  //           setFormData(null);
  //           parentHandlers.handleAddMailingAddressClicked();
  //         }
  //       }
  //       handleUpdateMailingAddressClicked={ () =>
  //         {
  //           setFormData(null);
  //           parentHandlers.handleUpdateMailingAddressClicked();
  //         }
  //       }
  //       mode={ formMode }
  //       onChange={ onUserFormChange }
  //       residenceInputMode={ parentState.residenceInputMode }
  //       selectedResidenceIDInResidenceSelect={ parentState.selectedResidenceIDInResidenceSelect }
  //       setSelectedResidenceIDInResidenceSelect={ parentState.setSelectedResidenceIDInResidenceSelect }
  //       userData={ formData }
  //       parentRefs={ parentRefs }
  //     />
  //   );
  // } else if (formType === constants.FORM_TYPE_USER && formMode === constants.MODE_USER_SELF_REGISTER && formDataIsUser()) {
  //   return (
  //     <UserForm
  //       handleAddUserClicked={ handleAddUserClicked }
  //       handleClearImageClicked={ handleClearImageClicked }
  //       handleAddMailingAddressClicked={ () =>
  //         {
  //           setFormData(null);
  //           parentHandlers.handleAddMailingAddressClicked();
  //         }
  //       }
  //       mode={ formMode }
  //       onChange={ onUserFormChange }
  //       userData={ formData }
  //       parentRefs={ parentRefs }
  //     />
  //   );
  // } else if (formType === constants.FORM_TYPE_USER && formMode === constants.MODE_USER_PROFILE && formDataIsUser()) {
  //   return (
  //     <UserForm
  //       handleUpdateUserClicked={ handleUpdateUserClicked }
  //       handleClearImageClicked={ handleClearImageClicked }
  //       handleAddMailingAddressClicked={ () =>
  //         {
  //           setFormData(null);
  //           parentHandlers.handleAddMailingAddressClicked();
  //         }
  //       }
  //       handleUpdateMailingAddressClicked={ () =>
  //         {
  //           setFormData(null);
  //           parentHandlers.handleUpdateMailingAddressClicked();
  //         }
  //       }
  //       mode={ formMode }
  //       onChange={ onUserFormChange }
  //       userData={ formData }
  //       parentRefs={ parentRefs }
  //     />
  //   );
  // }
}
export default FormManager;
