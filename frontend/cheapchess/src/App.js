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
import './App.css';
import Board from './components/board';
import boardDataIsInitialized from "./utils/board_dataIsInitialized";
import constants from './constants';
import convertArrayToDict from './utils/convertArrayToDict';
import { emptyFormData_GameControls } from './utils/formData_GameControls';
import { emptyFormData_NewGame } from "./utils/formData_NewGame";
import { formDataIs_GameControls } from "./utils/formData_GameControls";
import { formDataIs_NewGame } from './utils/formData_NewGame';
import FormManager from "./components/FormManager";
import Game from './pages/game';
import GameControlsForm from './forms/GameControlsForm';
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
import NewGameForm from './forms/NewGameForm';
import Piece from './components/piece';
import pieceExistsBetweenTwoSquares from './utils/board_pieceExistsBetweenTwoSquares';
import Square from './components/square';
import updateBoardDataWithFetchedPieces from './utils/board_updateBoardDataWithFetchedPieces';
import validateStrArg from './utils/validateStrArg';

function App() {
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Enable dependency injection by creating a standard list
     of imports that can easily be overridden in each component. */
  const standardImports = {
    apiGetPossibleMoves              : apiGetPossibleMoves,
    Board                            : Board,
    Button                           : Button,
    boardDataIsInitialized           : boardDataIsInitialized,
    Col                              : Col,
    constants                        : constants,
    Container                        : Container,
    convertArrayToDict               : convertArrayToDict,
    emptyFormData_GameControls       : emptyFormData_GameControls,
    emptyFormData_NewGame            : emptyFormData_NewGame,
    Form                             : Form,
    formDataIs_GameControls          : formDataIs_GameControls,
    formDataIs_NewGame               : formDataIs_NewGame,
    FormManager                      : FormManager,
    Game                             : Game,
    GameControlsForm                 : GameControlsForm,
    getAllPieceLocations             : getAllPieceLocations,
    getExclusiveRange                : getExclusiveRange,
    getIcons                         : api_GetIcons,
    getRankFileStr                   : getRankFileStr,
    getSquaresBetween                : getSquaresBetween,
    getSquareData                    : getSquareData,
    initializeBoardData              : initializeBoardData,
    MessageDisplay                   : MessageDisplay,
    newGame                          : newGame,
    NewGameForm                      : NewGameForm,
    Piece                            : Piece,
    pieceExistsBetweenTwoSquares     : pieceExistsBetweenTwoSquares,
    Row                              : Row,
    Square                           : Square,
    updateBoardDataWithFetchedPieces : updateBoardDataWithFetchedPieces,
    validateStrArg                   : validateStrArg,
  }

  /* Placeholders for custom import list for each component.
   This will allow dependencies to be updated in a single
   place (here) without affecting components themselves and
   minimize repetitive importing in each component. */
  const boardImports = {...standardImports}
  const squareImports = {...standardImports}
  
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
