/* This component represents a single square on a 
   chess board . */

/* External Imports */
//import { useEffect } from 'react';

/* Internal Imports */
import styles from './Square.module.css';

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

  // For dev/test
  // useEffect(() => {
  //   // test
  //   console.log('Here in Square.js');
  //   console.log(parentState.squareData);
  // },[parentState?.squareData]);

  //////////////
  /// Render ///
  //////////////

  return (
    <div
      className={ `${ parentState?.squareData?.color ? parentState.squareData.color : ''} ${parentState?.squareData === parentState?.selectedOriginSquare ? styles.borderColor : ''} ${styles.relativesquare} square` }
      onClick={ parentState?.handleSquareClicked && parentState?.squareData
        ?
        (e) => {
          parentState?.handleSquareClicked(e, parentState.squareData)
        }
        : null}
    >
      {
        parentState?.showFileRankLabels
        ?
          <div className={styles.fileranklabel}>
            {`${parentState.squareData.file}${parentState.squareData.rank}`}
          </div>
        : null
      }
      {
        parentState?.squareData?.piece && parentState?.imports?.Piece ?
          <parentState.imports.Piece parentState={ parentState } />
        : ''
      }


    </div>
  );
}

export default Square;