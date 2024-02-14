/* Internal Imports */
import squareDataHasPiece from './square_DataHasPiece';
import squareDataHasRankFile from './square_DataHasRankFile';

/**
 * Returns true if board is a 2D array of dicts with valid rank/file data
 *   but no pieces.
 * Returns false if board is not a 2D array of dicts with valid rank/file data
 *   or if the board has pieces.
 * @param {array} boardData
 * @returns {boolean}
 */
const boardDataIsInitialized = (boardData) => {
  if (!Array.isArray(boardData)) {
    return false;
  }

  for (const row of boardData) {
    if (!Array.isArray(row)) {
      return false;
    }

    for (const squareData of row) {
      if (!squareDataHasRankFile(squareData)) {
        return false;
      }

      if (squareDataHasPiece(squareData)) {
        return false;
      }
    }
  }

  return true;
};

export default boardDataIsInitialized;