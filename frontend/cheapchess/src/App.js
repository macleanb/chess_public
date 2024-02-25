/* External Imports */
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";

/* Internal Imports */
import api_GetIcons from './utils/api_GetIcons';
import apiGetPossibleMoves from './utils/api_GetPossibleMoves';
import apiGetSuggestedMove from "./utils/api_GetSuggestedMove";
import './App.css';
import Board from './components/board';
import boardDataIsInitialized from "./utils/board_dataIsInitialized";
import constants from './constants';
import convertArrayToDict from './utils/convertArrayToDict';
import { emptyFormData_GameControls } from './utils/formData_GameControls';
import { emptyFormData_NewGame } from "./utils/formData_NewGame";
import { emptyFormData_User } from './utils/formData_User';
import { formDataIs_GameControls } from "./utils/formData_GameControls";
import { formDataIs_NewGame } from './utils/formData_NewGame';
import { formDataIs_User } from './utils/formData_User';
import Form_Game from './forms/Form_Game';
import Form_GameControls from './forms/Form_GameControls';
import Form_User from './forms/Form_User';
import FormManager from "./components/FormManager";
import Game from './pages/game';
import getAllPieceLocations from "./utils/board_getAllPieceLocations";
import getExclusiveRange from './utils/getExclusiveRange';
import getRankFileStr from "./utils/getRankFileStr";
import getSquaresBetween from './utils/board_getSquaresBetween';
import getSquareData from './utils/board_getSquareData';
import initializeBoardData from "./utils/board_initializeBoardData";
import MessageDisplay from './components/messageDisplay';
import MessageContext from './contexts/MessageProvider';
import { MessageProvider } from './contexts/MessageProvider';
import newGame from './utils/api_NewGame';
import Piece from './components/piece';
import pieceExistsBetweenTwoSquares from './utils/board_pieceExistsBetweenTwoSquares';
import registerUser from "./utils/api_RegisterUser";
import reportUserFormValidity from './utils/form_reportUserFormValidity';
import Square from './components/square';
import updateBoardDataWithFetchedPieces from './utils/board_updateBoardDataWithFetchedPieces';
import UserInputs from './components/UserInputs';
import validateStrArg from './utils/validateStrArg';

function App() {
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Enable dependency injection by creating a standard list
     of imports that can easily be overridden in each component. */
  const standardImports = {
    apiGetPossibleMoves              : apiGetPossibleMoves,
    apiGetSuggestedMove              : apiGetSuggestedMove,
    Board                            : Board,
    Button                           : Button,
    boardDataIsInitialized           : boardDataIsInitialized,
    Col                              : Col,
    constants                        : constants,
    Container                        : Container,
    convertArrayToDict               : convertArrayToDict,
    emptyFormData_GameControls       : emptyFormData_GameControls,
    emptyFormData_NewGame            : emptyFormData_NewGame,
    emptyFormData_User               : emptyFormData_User,
    Form                             : Form,
    formDataIs_GameControls          : formDataIs_GameControls,
    formDataIs_NewGame               : formDataIs_NewGame,
    formDataIs_User                  : formDataIs_User,
    Form_Game                        : Form_Game,
    Form_GameControls                : Form_GameControls,
    Form_User                        : Form_User,
    FormManager                      : FormManager,
    Game                             : Game,
    getAllPieceLocations             : getAllPieceLocations,
    getExclusiveRange                : getExclusiveRange,
    getIcons                         : api_GetIcons,
    getRankFileStr                   : getRankFileStr,
    getSquaresBetween                : getSquaresBetween,
    getSquareData                    : getSquareData,
    initializeBoardData              : initializeBoardData,
    MessageDisplay                   : MessageDisplay,
    newGame                          : newGame,
    Piece                            : Piece,
    pieceExistsBetweenTwoSquares     : pieceExistsBetweenTwoSquares,
    registerUser                     : registerUser,
    reportUserFormValidity           : reportUserFormValidity,
    Row                              : Row,
    Square                           : Square,
    updateBoardDataWithFetchedPieces : updateBoardDataWithFetchedPieces,
    UserInputs                       : UserInputs,
    validateStrArg                   : validateStrArg,
  }

  /* Placeholders for custom import list for each component.
   This will allow dependencies to be overridden for specific
   components if needed. */
  const boardImports = {}
  const squareImports = {}
  
  /* Bundle all component imports into imports package */
  const compositeImports = {
    ...standardImports,
    forBoard  : boardImports, // TODO: make sure these are being used
    forSquare : squareImports, // TODO: make sure these are being used
  }
  
  /* Context Declarations */
  const { messages, setMessages } = useContext(MessageContext);

  /* State Declarations */
  const [ appState, setAppState ] = useState({
    imports: compositeImports,
  });

  return (
    <React.StrictMode>
      <MessageProvider>
        <main className="App">
          <Router>
            <Routes>

              {/* Unprotected Routes */}
              <Route path="/" element={ <Game appState={ appState }/> }/>
              <Route path="/game" element={ <Game appState={ appState }/> }/>

            </Routes>
          </Router>
        </main>
      </MessageProvider>
    </React.StrictMode>
  );
}

export default App;
