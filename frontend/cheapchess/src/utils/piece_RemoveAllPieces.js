/* Internal Imports */
import constants from '../constants';
import getAllSquareIDs from './square_getAllSquareIDs';
import getSquareData from './board_getSquareData';

/**
 * Copies boardData, removes all pieces from the copied board,
 * and returns the modified copied board.
 * @param {Array} boardData
 * @returns {Array}
 */
const removeAllPieces = (boardData) => {
  const tempBoardData = [...boardData];
  const allSquareIDs = getAllSquareIDs();

  for (const squareID of allSquareIDs) {
      /* Player color in this function call is irrelevant */
      const squareData = getSquareData(
        tempBoardData,
        squareID,
        constants.COLOR_PIECE_LIGHT
        );
      squareData.piece = null;
  }

  return tempBoardData;
};

export default removeAllPieces;