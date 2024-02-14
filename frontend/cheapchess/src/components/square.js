/* This component represents a single square on a 
   chess board . */

/* External Imports */

/* Internal Imports */
   
  ////////////////////////
  /// Helper Functions ///
  ////////////////////////
   
   
const Square = (
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
    <div className={ `${ parentState?.squareData?.color ? parentState.squareData.color : ''} square` }>
      <img
        src={ parentState?.squareData?.piece ? parentState.squareData.piece.icon : ''}
        alt={ parentState?.squareData?.piece ? parentState.squareData.piece.description : ''}
        className="pieceicon"
      />
    </div>
  );
}

export default Square;
   
   