/* This component represents a single square on a 
   chess board . */

/* External Imports */
import { useState, useEffect, useContext, useRef } from 'react';

/* Internal Imports */
//import ImportContext from '../contexts/ImportProvider';
import MessageContext from '../contexts/MessageProvider';
   
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
    <div className={ `${ parentState?.color ? parentState.color : ''} square` }>

    </div>
  );
}

export default Square;
   
   