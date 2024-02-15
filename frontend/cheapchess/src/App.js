/* External Imports */
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//import { Configuration, OpenAIApi } from 'openai';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";

/* Internal Imports */
import api_GetIcons from './utils/api_GetIcons';
import './App.css';
import Board from './components/board';
import boardDataIsInitialized from "./utils/board_dataIsInitialized";
import constants from './constants';
import convertArrayToDict from './utils/convertArrayToDict';
import Game from './pages/game';
import getRankFileStr from "./utils/getRankFileStr";
import initializeBoardData from "./utils/board_initializeBoardData";
import MessageDisplay from './components/messageDisplay';
import MessageContext from './contexts/MessageProvider';
import { MessageProvider } from './contexts/MessageProvider';
//import postOpenAIRequest from "./utils/api_PostOpenAIRequest";
import Square from './components/square';
import validateStrArg from './utils/validateStrArg';

function App() {
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Enable dependency injection by creating a standard list
     of imports that can easily be overridden in each component. */
  const standardImports = {
    Board                         : Board,
    boardDataIsInitialized        : boardDataIsInitialized,
    Col                           : Col,
    constants                     : constants,
    Container                     : Container,
    convertArrayToDict            : convertArrayToDict,
    Game                          : Game,
    getIcons                      : api_GetIcons,
    getRankFileStr                : getRankFileStr,
    initializeBoardData           : initializeBoardData,
    MessageDisplay                : MessageDisplay,
    //openAIKey                     : process.env.REACT_APP_OPEN_AI_KEY,
    //OpenAIConfig                  : Configuration,
    //OpenAIApi                     : OpenAIApi,
    //postOpenAIRequest             : postOpenAIRequest,
    Row                           : Row,
    Square                        : Square,
    validateStrArg                : validateStrArg,
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
    forBoard  : boardImports,
    forSquare : squareImports,
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
