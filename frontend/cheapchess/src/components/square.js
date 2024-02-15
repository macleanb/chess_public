/* This component represents a single square on a 
   chess board . */

/* External Imports */

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

  //////////////
  /// Render ///
  //////////////

  return (
    <div className={ `${ parentState?.squareData?.color ? parentState.squareData.color : ''} square` }>
      {/* <img
        src={ parentState?.squareData?.piece ? parentState.squareData.piece.icon : ''}
        alt={ parentState?.squareData?.piece ? parentState.squareData.piece.description : ''}
        className="pieceicon"
      /> */}

      {
        parentState?.squareData?.piece && parentState?.imports?.Piece ?
          <parentState.imports.Piece parentState={ parentState } />
        : ''
      }


    </div>
  );
}

export default Square;