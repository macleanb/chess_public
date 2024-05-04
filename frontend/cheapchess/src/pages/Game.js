/* External Imports */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

/* Internal Imports */
import AuthContext from '../contexts/AuthProvider';
import constants from '../constants';
import MessageContext from '../contexts/MessageProvider';
import getSquareData from '../utils/board_getSquareData';

const Game = () => 
{
  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  /* Context Declarations */
  const appState = useOutletContext();
  const { auth, setAuth } = useContext(AuthContext);
  const { messages, setMessages } = useContext(MessageContext);

  /* State Declarations */
  /* boardData is a 2D array containing a single squareData object in
     each element.  This array will be passed to a html component for 
     display, with the top rows holding the opponent's pieces and the 
     bottom rows holding the player's pieces.  If the player's color
     is light, the lower rows will hold ranks 1 & 2, and the left
     column will correspond to file 'a'.  But if the player's color is
     dark, the lower rows will hold ranks 7-8 and the left colum will
     correspond with to file 'h'.  For this reason, do not access
     boardData directly unless absolutely necessary.  Instead use the
     convenience util function square_getSquareData() along with
     the various mappings of ranks and files to rows and cols in the
     constants file. */
  const [ boardData, setBoardData ] = useState(null);

  /* Stores a boolean value to indicate whether or not the board has been
     initialized according to player color (setting square file/ranks according
     to player color)
  */
  const [ boardInitializationState, setBoardInitializationState ] = useState(constants.STATUS_NOT_INITIALIZED);

  /* Stores data as state for any form being displayed */
  const [ formData, setFormData ] = useState();

  /* Stores the mode for the form being displayed */
  const [ formMode, setFormMode ] = useState();

  /* Stores the type of the form being displayed */
  const [ formType, setFormType ] = useState();

  /* A JSON object received from the game server */
  const [ gameDataFromServer, setGameDataFromServer ] = useState();

  /* gameFetchData state will be an object with the following properties:
  {
    requestedPlayerColor : populate w/selected player color from either
                          the new game select or a selected existing game

    gameID               : null for new games or populated with the
                           selected existinggame ID

    requestedGameType    : constants.GAME_FETCH_NEW (would POST to /games/) or
                           constants.GAME_FETCH_JOIN (would POST to /games/<int:game_id>/) or
                           constants.GAME_FETCH_CONTINUE (would GET to /games/<int:game_id>/)

    playComputer         : true/false (based on 'Play against computer' checkbox)
  } */
  const [ gameFetchData, setGameFetchData ] = useState();

  /* An array that keeps track of any squares that are highlighted
     with a color different from their original color. */
  const [ highlightedSquares, setHighlightedSquares ] = useState([]);

  /* Stores iconData (including images) for chess pieces */
  const [ iconData, setIconData ] = useState();

  /* Stores all games that the logged-in user can play */
  const [ playableGames, setPlayableGames ] = useState();

  /* Stores color selected by player */
  const [ playerColor, setPlayerColor ] = useState('light');

  /* Holds state for the selected color option in NewGameForm */
  const [ selectedColorOptionInColorOptionSelect, setSelectedColorOptionInColorOptionSelect ] = useState();

  /* Holds state (boolean) for whether file/rank labels should be displayed on board */
  const [ showFileRankLabels, setShowFileRankLabels ] = useState(false);

  /*holds state for the selected square */
  const [ selectedOriginSquare, setSelectedOriginSquare ] = useState();

  /* Stores whether to use Python-Chess for displaying possible moves */
  const [ usePythonChessForPossibleMoves, setUsePythonChessForPossibleMoves ] = useState();

  /* Ref Declarations */
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputFirstNameRef = useRef(null);
  const inputLastNameRef = useRef(null);

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////

  //////////////////////
  /// Event Handlers ///
  //////////////////////

  /* After new game is created, update game form mode */
  const handleGameQuit = () => {
    if (appState?.imports) {
      setGameDataFromServer(null);
      const clearedBoard = appState.imports.initializeBoardData('light');
      setBoardInitializationState(constants.STATUS_NOT_INITIALIZED);
      setBoardData(clearedBoard);
      
      setFormMode(appState.imports.constants.FORM_MODE_GAME_NEW_CONTINUE);
      setFormType(appState.imports.constants.FORM_TYPE_GAME_MENU);
    }
  }

  /* After new game is created, update game form mode */
  const handleNewGameCreated = () => {
    if (appState?.imports) {
      setFormMode(appState.imports.constants.FORM_MODE_GAME_CONTROLS_PLAY);
      setFormType(appState.imports.constants.FORM_TYPE_GAME_CONTROLS);
    }
  }

  /* Display suggested move when received from API call */
  const handleSuggestedMoveReceived = (suggestedMove) => {
    /* Restore any highlighted squares to their original color */
    const tempBoardData = [...boardData]; // copy boardData
    for (const highlightedSquare of highlightedSquares) {
      const squareData = appState.imports.getSquareData(
        tempBoardData,
        highlightedSquare.square,
        playerColor
      );
      squareData.color = highlightedSquare.originalColor;
    }

    /* For each square in the response ([<origin_squareID>, <dest_squareID>]),
       color the square on our board blue */
    const newHighlightedSquares = [];
    for (const squareID of suggestedMove) {
      const boardSquareData = appState.imports.getSquareData(
        tempBoardData,
        squareID,
        playerColor
        );

      const originalSquareColor = boardSquareData.color;
      boardSquareData.color = 'bluesquare';

      newHighlightedSquares.push({
        square         : squareID,
        originalColor  : originalSquareColor
      });
    }

    setBoardData(tempBoardData);
    setHighlightedSquares(newHighlightedSquares);
  }

  /////////////////
  /* Use Effects */
  /////////////////

  /* Get Icon Data once page is loaded */
  useEffect(() => {
    if (!iconData && appState?.imports) {
      appState.imports.getIcons(setMessages).then((result) => {      
        if (result) {
          /* Before setting the result, convert it to a dict
             using each value of the icon data's name field as the key */
          const objResult = appState.imports.convertArrayToDict(
            result,
            appState.imports.constants.FIELD_NAME_ICON_NAME
            );
          setIconData(objResult);
        }
      });
    }
  }, []); // shouldn't need to watch appState?.imports

  /* Set formMode and formType once page is loaded
     depending on user auth state */
  useEffect(() => {
    if (auth && appState?.imports) {
      if (auth.status === constants.STATUS_AUTHENTICATED) {
        setFormMode(constants.FORM_MODE_GAME_NEW_CONTINUE);
        setFormType(constants.FORM_TYPE_GAME_MENU);
      } else {
        setFormMode(constants.FORM_MODE_USER_SIGNIN);
        setFormType(constants.FORM_TYPE_USER);
        const emptyBoardData = appState.imports.initializeBoardData('light');
        setBoardData(emptyBoardData);
      }
    }
  }, [auth, appState?.imports]);

  /* Get playable games data once user is logged in and 
     game menu is requested from FormManager */
  useEffect(() => {
    if (
      appState?.imports &&
      auth?.status === constants.STATUS_AUTHENTICATED &&
      formMode === constants.FORM_MODE_GAME_NEW_CONTINUE &&
      formType === constants.FORM_TYPE_GAME_MENU
      )
    {
      appState.imports.getPlayableGames().then((result) => {      
        if (result) {
          setPlayableGames(result.data);
        }
      }).catch( error => { 
        setMessages({Error: 'Failed to fetch playable games (see console).' });
        console.error('Failed to fetch playable games:', error);
      });
    }
  }, [appState.imports, auth?.status, formMode, formType]);

  /* Every time gameFetchData is updated, this will set player color
    to the selected color extracted from gameFetchData */
  useEffect(() => {
    /* Ensure playerColor is reset before continuing */
    if (gameFetchData && playerColor === null) {
      setPlayerColor(gameFetchData.requestedPlayerColor);
    }
  }, [gameFetchData, playerColor]);

  /* Once player color has been set and boardData has been result to null,
     initialize boardData. */
  useEffect(() => {
    if (
      playerColor &&
      boardData === null &&
      boardInitializationState === appState.imports.constants.STATUS_INITIALIZING
      )
    {
      /* Now that a new player color has been selected for a game that is initializing,
         initialize the game board for the player color.  This will arrange the square
         files/ranks appropriate to the player color and orientation of the board
         relative to the user */ 
      const initializedBoardData = appState.imports.initializeBoardData(playerColor);
      setBoardData(initializedBoardData);
    }
  }, [boardData, boardInitializationState, playerColor]);

  /* Once board data has been set with initialized data, update initialization
     state to initialized. */
  useEffect(() => {
    if (
      boardData &&
      boardInitializationState === appState.imports.constants.STATUS_INITIALIZING
      )
    {
      setBoardInitializationState(appState.imports.constants.STATUS_INITIALIZED);
    }
  }, [boardData, boardInitializationState]);

  /* Once board initialization status is INITIALIZED, fetch game data from server.
     (Call the appropriate API endpoint to get pieces - save in gameDataFromServer) */
  useEffect(() => {
    if (
      boardData &&
      boardInitializationState === appState.imports.constants.STATUS_INITIALIZED
      )
    {
      const formData = {};
      const gameID = gameFetchData.gameID;
      
      switch (gameFetchData.requestedGameType) {

        case constants.GAME_FETCH_NEW:
          formData['player1Color'] = gameFetchData.requestedPlayerColor;
          formData['play_computer'] = gameFetchData.playComputer;
          appState.imports.newGame(formData, setMessages).then((newGameData) => {
            const updatedNewGameData = appState.imports.updateIconURLs(newGameData, iconData);
            setGameDataFromServer(updatedNewGameData);
            handleNewGameCreated();
          });
          break;

        case constants.GAME_FETCH_JOIN:
          appState.imports.joinGame(gameID, formData, setMessages).then((joinedGameData) => {
            const updatedJoinedGameData = appState.imports.updateIconURLs(joinedGameData, iconData);
            setGameDataFromServer(updatedJoinedGameData);
            handleNewGameCreated();
          });
          break;
        
        case constants.GAME_FETCH_CONTINUE:
          appState.imports.continueGame(gameID, formData, setMessages).then((continuedGameData) => {
            const updatedContinuedGameData = appState.imports.updateIconURLs(continuedGameData, iconData);
            setGameDataFromServer(updatedContinuedGameData);
            handleNewGameCreated();
          });
          break;
        
  
        default:
          throw new TypeError('Invalid game fetch requested game type');
      }
    }
  }, [boardInitializationState]);

  /* Whenever gameDataFromServer changes, update boardData (will update UI). */
  useEffect(() => {
    /* Create 'active' variable for clean-up up purposes.
       It will ensure that state setters are not called
       if the app is closed while an async process is executing */
    let active = true;

    if (
      gameDataFromServer &&
      boardData &&
      boardData !== null &&
      playerColor &&
      boardInitializationState === appState.imports.constants.STATUS_INITIALIZED
      )
    {

    const updatedBoardData = appState.imports.updateBoardDataWithFetchedPieces(
      boardData,
      gameDataFromServer,
      playerColor,
    );

    /* handles deselection of the origin square and piece after move is made
    and removes the green highlight from recommended squares.*/
    for (const highlightedSquare of highlightedSquares) {
      const squareData = getSquareData(
        updatedBoardData,
        highlightedSquare.square,
        playerColor
      );
      squareData.color = highlightedSquare.originalColor;
    }

    setSelectedOriginSquare(null);
    
    /* Update boardData state */
    setBoardData(updatedBoardData);
    }

    /* Display a message if the game has been won */
    if (gameDataFromServer?.game_winner) {
      setMessages({'CHECK MATE': `Congratulations ${gameDataFromServer.game_winner.first_name}, you won the game!`});
    }

    /* Refresh the board every 5s */
    if (
      gameDataFromServer &&
      gameDataFromServer.game_status !== 'ENDED' &&
      (
        gameDataFromServer.whose_turn?.id !== auth?.user?.id ||
        gameDataFromServer.game_status === 'not_started'
      ) &&
      playerColor
      ) {
      setTimeout(() => {
        appState.imports.continueGame(gameDataFromServer.id, {}, setMessages).then((continuedGameData) => {
          if (continuedGameData?.pieces && active) {
            const updatedContinuedGameData = appState.imports.updateIconURLs(continuedGameData, iconData);
            setGameDataFromServer(updatedContinuedGameData);
          }
        });
      }, 5000);
    }
  }, [gameDataFromServer, playerColor]);

  // For dev/test: prints boardData whenever it changes
  // useEffect(() => {
  //   console.log(`here in game, board data updated!`);
  //   if (Array.isArray(boardData)) {
  //     for (const row of boardData) {
  //       for (const squareData of row) {
  //         console.log(`Square: ${JSON.stringify(squareData)}`);
  //       }
  //     }
  //   }
  // }, [boardData]);

  // For dev/test: prints gameDataFromServer whenever it changes
  // useEffect(() => {
  //   console.log(`here in game, game data updated!`);
  //   if (gameDataFromServer) {
  //     console.log(gameDataFromServer);
  //   }
  // }, [gameDataFromServer]);

  // For dev/test: prints gameDataFromServer whenever it changes
  // useEffect(() => {
  //   console.log(`here in Game.js, playable games:`);
  //   if (playableGames) {
  //     console.log(playableGames);
  //   }
  // }, [playableGames]);

  // For dev/test: prints auth whenever it changes
  // useEffect(() => {
  //   console.log(`here in game, auth data updated!`);
  //   if (auth) {
  //     console.log(auth);
  //   }
  // }, [auth]);

  ////////////
  /* Render */
  ////////////

  return (
    <div>
    {
      appState.imports
      ?
        <div>
          <appState.imports.MessageDisplay />
          <div className="game-main-container">
              <appState.imports.FormManager
                parentState={{
                  ...appState,
                  auth                                        : auth,
                  boardData                                   : boardData,
                  formData                                    : formData,
                  formMode                                    : formMode,
                  formType                                    : formType,
                  gameDataFromServer                          : gameDataFromServer,
                  handleGameQuit                              : handleGameQuit,
                  handleNewGameCreated                        : handleNewGameCreated,
                  handleSuggestedMoveReceived                 : handleSuggestedMoveReceived,
                  iconData                                    : iconData,
                  playableGames                               : playableGames,
                  playerColor                                 : playerColor,
                  selectedColorOptionInColorOptionSelect      : selectedColorOptionInColorOptionSelect,
                  selectedOriginSquare                        : selectedOriginSquare,
                  setBoardData                                : setBoardData,
                  setBoardInitializationState                 : setBoardInitializationState,
                  setFormData                                 : setFormData,
                  setFormMode                                 : setFormMode,
                  setFormType                                 : setFormType,
                  setGameDataFromServer                       : setGameDataFromServer,
                  setGameFetchData                            : setGameFetchData,
                  setHighlightedSquares                       : setHighlightedSquares,
                  setMessages                                 : setMessages,
                  setPlayerColor                              : setPlayerColor,
                  setSelectedColorOptionInColorOptionSelect   : setSelectedColorOptionInColorOptionSelect,
                  setShowFileRankLabels                       : setShowFileRankLabels,
                  setSelectedOriginSquare                     : setSelectedOriginSquare,
                  setUsePythonChessForPossibleMoves           : setUsePythonChessForPossibleMoves,
                  showFileRankLabels                          : showFileRankLabels,
                  usePythonChessForPossibleMoves              : usePythonChessForPossibleMoves,
                }}
                parentRefs={{
                  inputEmailRef       : inputEmailRef,
                  inputPasswordRef    : inputPasswordRef,
                  inputFirstNameRef   : inputFirstNameRef,
                  inputLastNameRef    : inputLastNameRef,
                }}
              />
              <appState.imports.Board parentState={{
                ...appState,
                auth                             :   auth,
                boardData                        :   boardData,
                gameDataFromServer               :   gameDataFromServer,
                highlightedSquares               :   highlightedSquares,
                iconData                         :   iconData,
                playerColor                      :   playerColor,
                setBoardData                     :   setBoardData,
                setGameDataFromServer            :   setGameDataFromServer,
                setHighlightedSquares            :   setHighlightedSquares,
                setMessages                      :   setMessages,
                showFileRankLabels               :   showFileRankLabels,
                selectedOriginSquare             :   selectedOriginSquare,
                setSelectedOriginSquare          :   setSelectedOriginSquare,
                usePythonChessForPossibleMoves   :   usePythonChessForPossibleMoves,
              }}/>
          </div>
          <div>
            Board icons sourced from:
            <div>
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by apien - Flaticon</a> (Dark Knight)
              <a href="https://www.flaticon.com/free-icons/pawn" title="pawn icons">Pawn icons created by VectorPortal - Flaticon</a> (Dark Pawn, Light Pawn)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by deemakdaksina - Flaticon</a> (Dark Rook, Light Rook, Dark King)
              <a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by Freepik - Flaticon</a> (Dark Bishop, Light King)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by Victoruler - Flaticon</a> (Dark Queen, Light Queen)
              <a href="https://www.flaticon.com/free-icons/chess" title="chess icons">Chess icons created by SBTS2018 - Flaticon</a> (Light Knight)
              <a href="https://www.flaticon.com/free-icons/chess-piece" title="chess piece icons">Chess piece icons created by rizal2109 - Flaticon</a> (Light Bishop)
            </div>
          </div>
        </div>
      : 'Imports not loaded...'
    }
    </div>
  );
}

export default Game;
