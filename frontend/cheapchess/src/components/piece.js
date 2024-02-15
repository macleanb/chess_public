/* This component represents a single piece on a 
   chess board . */

/* External Imports */

/* Internal Imports */
   
  ////////////////////////
  /// Helper Functions ///
  ////////////////////////
   
const Piece = (
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
    <img
      className={ `piece` }
      onClick={ parentState?.handlePieceClicked && parentState?.squareData?.piece
                ?
                (e) => {
                  parentState?.handlePieceClicked(
                    e,
                    parentState.squareData.piece
                    )
                }
                : ''}
      src={ parentState?.squareData?.piece ? parentState.squareData.piece.icon : ''}
      alt={ parentState?.squareData?.piece ? parentState.squareData.piece.description : ''}
    />
  );
}

export default Piece;