/* External Imports */
import { useContext, useEffect } from 'react';

/* Internal Imports */
import MessageContext from '../contexts/MessageProvider';

/* This component is a flexible-use form manager for
   User, Address, and Residence objects. */
const FormManager = ({
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
    // const onUserFormChange = e => {
    //   if (e && e.target?.name === 'image') {
    //     parentState.setFormData({ 
    //       ...parentState.formData, 
    //       imageFileName: e.target.value,
    //       image: e.target.files['0'],
    //     });
    //   } else if (e && e.target?.name === 'deleteExistingImageCheckbox') {
    //     const checked = e.target.checked;
  
    //     if (checked) {
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         imageFileName: '',
    //         image: null,
    //         deleteExistingImage: true
    //       });
    //     } else { // User had wanted to set image to null but changed mind
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         deleteExistingImage: false
    //       });
    //     }
    //   } else if (e && e.target?.name === 'isActiveCheckbox') {
    //     const checked = e.target.checked;
  
    //     if (checked) {
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         is_active: true
    //       });
    //     } else {
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         is_active: false
    //       });
    //     }
    //   } else if (e && e.target?.name === 'isStaffCheckbox') {
    //     const checked = e.target.checked;
  
    //     if (checked) {
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         is_staff: true
    //       });
    //     } else {
    //       parentState.setFormData({ 
    //         ...parentState.formData,
    //         is_staff: false
    //       });
    //     }
    //   } else {
    //     /* For all other field changes, use the generic set function */
    //     parentState.setFormData({ ...parentState.formData, [e.target.name]: e.target.value });
    //   }
    // }

  /* Adds a user and begins a multi-step process for 
     adding a mailing address and residences to the
     selected user. */
  // const handleAddUserClicked = async (event) => {
  //   event.preventDefault();
  //   let apiResponse = null;

  //   /* Check for validation errors and report as needed. */
  //   const formIsValid = reportUserFormValidity(formData, parentRefs);

  //   if (formData && formIsValid) {
  //     if (formMode === constants.MODE_USER_ADD) {
  //       apiResponse = await addUser( // Administrators adding users
  //         auth,
  //         formData,
  //         setFrontEndErrors,
  //         setBackEndErrors,
  //         setSuccessMessages
  //       );
  //     } else if (formMode === constants.MODE_USER_SELF_REGISTER) {
  //       apiResponse = await registerUser( // Users self-registering
  //         auth,
  //         formData,
  //         setFrontEndErrors,
  //         setBackEndErrors,
  //         setSuccessMessages
  //       );
  //     }

  //     /* Notify the parent component that the user has been created & reset the form */
  //     if (await apiResponse && !backEndErrors && apiResponse.id) {
  //       const userData = apiResponse;
  //       setFormData(null);
  //       parentHandlers.handleUserCreated(userData);
  //     }
  //   }
  // }

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
    if (
      parentState?.imports &&
      parentState.formType === parentState.imports.constants.FORM_TYPE_GAME &&
      parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_NEW_CONTINUE
      )
    {
      parentState.setFormData(parentState.imports.emptyFormData_NewGame());
    } else if (
      parentState?.imports &&
      parentState.formType === parentState.imports.constants.FORM_TYPE_GAME &&
      parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_CONTROLS
    )
    {
      parentState.setFormData(parentState.imports.emptyFormData_GameControls());
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
    parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_NEW_CONTINUE &&
    parentState.imports?.formDataIs_NewGame(parentState.formData)
    ) {
    return (
      <parentState.imports.NewGameForm parentState={{
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
    parentState.formType === parentState.imports.constants.FORM_TYPE_GAME && 
    parentState.formMode === parentState.imports.constants.FORM_MODE_GAME_CONTROLS &&
    parentState.imports?.formDataIs_GameControls(parentState.formData)
  ) {
    return (
      <parentState.imports.GameControlsForm parentState={{
        ...parentState,
        handleSuggestMoveClicked     : handleSuggestMoveClicked,
        handleQuitGameClicked        : handleQuitGameClicked,
      }}/>
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
