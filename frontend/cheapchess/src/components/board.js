/* This component represents a chessboard */

/* External Imports */
//import { useContext } from 'react';

/* Internal Imports */
   
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
            {
              parentState?.boardData
              ?
                parentState.boardData.map((row, rowIndex) => {
                  return (
                    <parentState.imports.Row className="row gx-0" key={ rowIndex }>
                      {
                        row.map((squareData, colIndex) => {
                          return (
                            <parentState.imports.Col className="column" key={ colIndex }>
                              <parentState.imports.Square parentState={{
                                ...parentState,
                                squareData : squareData
                              }}/>
                            </parentState.imports.Col>
                          )
                        })
                      }
                    </parentState.imports.Row>
                  )
                })
              : '1 of 1'
            }
          </parentState.imports.Container>
        : 'Loading page...'
      }
    </div>
  );
}

export default Board;
   
   