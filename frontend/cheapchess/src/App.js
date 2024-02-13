/* External Imports */
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";

/* Internal Imports */
import './App.css';
import constants from './constants';
import Board from './components/board';
import Game from './pages/game';
import MessageDisplay from './components/messageDisplay';
import MessageContext from './contexts/MessageProvider';
import { MessageProvider } from './contexts/MessageProvider';
import Square from './components/square';

function App() {
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Enable dependency injection by creating a standard list
     of imports that can easily be overridden in each component. */
  const standardImports = {
    Board          : Board,
    Col            : Col,
    constants      : constants,
    Container      : Container,
    Game           : Game,
    MessageDisplay : MessageDisplay,
    Row            : Row,
    Square         : Square,
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
