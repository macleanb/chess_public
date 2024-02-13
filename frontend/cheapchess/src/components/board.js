/* This component represents a chessboard */

/* External Imports */
//import { useContext } from 'react';

/* Internal Imports */
//import ImportContext from '../contexts/ImportProvider';
   
  ////////////////////////
  /// Helper Functions ///
  ////////////////////////
   
   
const Board = (
  {
    parentState
  }) => 
{
  ////////////////////
  /// Declarations ///
  ////////////////////

  /* Context Declarations */
  //const { imports } = useContext(ImportContext);

   
  ///////////////////
  /// Use Effects ///
  ///////////////////

  //////////////
  /// Render ///
  //////////////

  return (
    <div>
      {
        parentState?.imports
        ?
          <parentState.imports.Container className={ `board` }>
            <parentState.imports.Row>
              <parentState.imports.Col>
                1 of 1
              </parentState.imports.Col>
            </parentState.imports.Row>
          </parentState.imports.Container>
        : 'Loading page...'
      }
    </div>
  );
}

export default Board;
   
   