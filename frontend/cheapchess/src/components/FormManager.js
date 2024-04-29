/* External Imports */
import { useContext, useEffect } from 'react';

/* Internal Imports */
import AuthContext from '../contexts/AuthProvider';
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
  const { auth, setAuth } = useContext(AuthContext);


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

  /* Adds a user to backend server/database. */
  const handleAddUserClicked = async (e) => {
    if (e) {
      e.preventDefault();
    }
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

        setMessages({Success: `Chess user ${apiResponse.first_name} was successfully added.`});
        parentState.setFormMode(parentState.imports.constants.FORM_MODE_USER_SIGNIN);
      }
    }
  }

  const handleJoinGameClicked = (e, game) => {
    parentState.setBoardData(null);
    parentState.setBoardInitializationState(parentState.imports.constants.STATUS_INITIALIZING);
    parentState.setPlayerColor(null);
    
    let gameFetchDataObj;
    const userIsPlayer1 = game?.player1?.id === auth.user.id;
    const userIsPlayer2 = game?.player2 === null ? false :  game?.player2?.id === auth.user.id;

    /* If the user WAS already a player in an existing game */
    if (userIsPlayer1 || userIsPlayer2) {
      const playerColor = userIsPlayer1 ? game.player1_color : game.player2_color;

      gameFetchDataObj = parentState.imports.createGameFetchDataObj(
        playerColor,
        game.id,
        parentState.imports.constants.GAME_FETCH_CONTINUE,
        false // playComputer
      );
    } else {
      /* If the user was NOT already a player in an existing game */
      const LIGHT = parentState.imports.constants.COLOR_PIECE_LIGHT;
      const DARK = parentState.imports.constants.COLOR_PIECE_DARK;

      const playerColor = game.player1_color ===  LIGHT ? DARK : LIGHT;

      gameFetchDataObj = parentState.imports.createGameFetchDataObj(
        playerColor,
        game.id,
        parentState.imports.constants.GAME_FETCH_JOIN,
        false // playComputer
      );
    }

    parentState?.setGameFetchData(gameFetchDataObj);
  }

  /* Set board data to null, set board state to INITIALIZING, set player color.
     The rest will be handled at Game.js */
  const handleNewGameClicked = async (e) => {
    parentState.setBoardData(null);
    parentState.setBoardInitializationState(parentState.imports.constants.STATUS_INITIALIZING);
    parentState.setPlayerColor(null);
    
    const selectedColor = parentState.imports.constants.COLOR_OPTIONS[
      parentState.selectedColorOptionInColorOptionSelect
    ].color;

    const gameFetchDataObj = parentState.imports.createGameFetchDataObj(
      selectedColor,
      null, // GameID
      parentState.imports.constants.GAME_FETCH_NEW,
      parentState.isComputerOpponent // playComputer
    );

    parentState.setGameFetchData(gameFetchDataObj);
  }

  /* Handle quitting game if they click the Quit Game button */
  const handleQuitGameClicked = () => {
    parentState.setHighlightedSquares([]);
    parentState.setShowFileRankLabels(false);

    /* Notify parent that game has been quit */
    if (parentState) {
      parentState.handleGameQuit();
    }
  }

  /* User login action */
  const handleSignInClicked = async (e) => {
    if (e) {
      e.preventDefault();
    }

    /* Check for validation errors and report as needed. */
    const formIsValid = parentState.imports.reportUserFormValidity(
      parentState.formData,
      parentRefs,
      parentState.formMode
      );

    if (parentState.formData && formIsValid) {
      if (parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SIGNIN) {
        const apiResponse = await parentState.imports.signIn(
          parentState.formData,
          setMessages
        );

        /* If the response contains user data, transition to form 
           for starting a new game or continuing an existing game */
        if (await apiResponse?.status === 200) {
          /* Update Authentication context */
          parentState.imports.parseAndSetAuth(apiResponse.data, setAuth);
          
          parentState.setFormMode(parentState.imports.constants.FORM_MODE_GAME_NEW_CONTINUE);
          parentState.setFormType(parentState.imports.constants.FORM_TYPE_GAME_MENU);
        }
      }
    }
  }

  /* User logout action */
  const handleSignOutClicked = async (e) => {
    parentState.imports.signOut(setAuth).then((result) => {
      /* Print goodbye message */
      setMessages({Success: 'Come back soon!'});

      /* Switch form back to user/sign in */
      parentState.setFormMode(parentState.imports.constants.FORM_MODE_USER_SIGNIN);
      parentState.setFormType(parentState.imports.constants.FORM_TYPE_USER);
    }).catch((e) => {
      setMessages({Error: `Unable to logout.  Please try again.\n ${e}`});
    });
  }

  /* Switch form from login to self-register */
  const handleSignUpClicked = async (e) => {
    e.preventDefault();
  
    parentState.setFormMode(parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER);
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

  /* Handles button click to toggle file/rank labels on board */
  const handleToggleFileRankLabelsClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    /* Reverse the boolean state value */
    parentState.setShowFileRankLabels(!parentState.showFileRankLabels);
  }

  /* Handles changes to NewGame Form */
  // const onGameNewFormChange = e => {
  //   parentState.imports.clearFormErrors(parentRefs);
  //   console.log("does this work?")
  //   if (parentState.imports.constants) {
  //     if (e.target.name === "player1Color") {
  //       /* Handle selected color */
  //       console.log("new if statement and branch works")
  //       const selectedColor = parentState.imports.constants.COLOR_OPTIONS[e.target.value];
  //       parentState.setFormData({ ...parentState.formData, [e.target.name]: selectedColor });
  //     }

      
  //   }
  // }
  
  /* Handles changes to UserForm */
  const onUserFormChange = e => {
    parentState.imports.clearFormErrors(parentRefs);

    parentState.setFormData({ ...parentState.formData, [e.target.name]: e.target.value });
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
        parentState.formType === parentState.imports.constants.FORM_TYPE_GAME_MENU &&
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
    parentState.formType === parentState.imports.constants.FORM_TYPE_GAME_MENU && 
    parentState.imports?.formDataIs_NewGame(parentState.formData)
    ) {
    return (
      <parentState.imports.Form_GameMenu parentState={{
        ...parentState,
        handleJoinGameClicked    : handleJoinGameClicked,
        handleNewGameClicked     : handleNewGameClicked,
        handleSignOutClicked     : handleSignOutClicked,
        // onGameNewFormChange      : onGameNewFormChange,
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
        handleSuggestMoveClicked          : handleSuggestMoveClicked,
        handleQuitGameClicked             : handleQuitGameClicked,
        handleToggleFileRankLabelsClicked : handleToggleFileRankLabelsClicked,
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
}
export default FormManager;
