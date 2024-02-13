/** This module is for providing a singular interface for programmers
 *  to manage imports and minimize code changes when dependencies
 *  change.
 */
/* External Imports */
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { createContext, useState } from "react";
import Row from 'react-bootstrap/Row';

/* Internal Imports */
import constants from '../constants';
import Board from '../components/board';
import Game from '../pages/game';
import MessageDisplay from '../components/messageDisplay';
import Square from '../components/square';

const ImportContext = createContext({});

/* A standard list of imports that can easily be overridden
   in each component */
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

const compositeImports = {
  ...standardImports,
  forBoard  : boardImports,
  forSquare : squareImports,
}

/* Collect all component imports into holistic imports */
const importsPackage = {
  imports   : compositeImports,
}

export const ImportProvider = ({ children }) => {
  const [ imports, setImports ] = useState(importsPackage);

  return (
    <ImportContext.Provider value={{ imports, setImports }}>
      { children }
    </ImportContext.Provider>
  );
}

export default ImportContext;