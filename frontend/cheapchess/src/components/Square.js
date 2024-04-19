/* This component represents a single square on a 
   chess board . */

/* External Imports */
//import { useEffect } from 'react';

/* Internal Imports */
   
const Square = (
  {
    parentState
  }) => 
{
  ////////////////////
  /// Declarations ///
  ////////////////////

  ////////////////////////
  /// Helper Functions ///
  ////////////////////////
   
  ///////////////////
  /// Use Effects ///
  ///////////////////

  // useEffect(() => {
  //   // test
  //   console.log(parentState.squareData);
  // },[parentState?.squareData]);

  //////////////
  /// Render ///
  //////////////

  return (
    <div className={ `${ parentState?.squareData?.color ? parentState.squareData.color : ''} square` }>
      {
        parentState?.squareData?.piece && parentState?.imports?.Piece ?
          <parentState.imports.Piece parentState={ parentState } />
        : ''
      }


    </div>
  );
}

export default Square;