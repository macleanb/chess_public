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
      src={ parentState?.squareData?.piece?.fk_icon?.image ? parentState.squareData.piece.fk_icon?.image : ''}
      alt={ parentState?.squareData?.piece?.fk_icon?.description ? parentState.squareData.piece.fk_icon.description : 'piece icon'}
    />
  );
}

export default Piece;