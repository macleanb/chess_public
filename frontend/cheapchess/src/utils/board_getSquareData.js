/* Internal Imports */
import constants from '../constants';
import isSquare from './square_isSquare';
/**
 * Returns squareData from boardData
 * @param {Array} boardData
 * @param {str} square
 * @returns {Object}
 */
const getSquareData = (boardData, square) => {
  if (!isSquare(square)) {
    throw new TypeError(`Square provided to getSquareData was invalid (${square})`);
  } else if (!Array.isArray(boardData)) {
    throw new TypeError(`BoardData provided to getSquareData was invalid (${boardData})`);
  }

  const rank = square[1];
  const file = square[0];
  const col = constants.MAPPING_FILE_TO_COLINDEX[file];
  const row = constants.MAPPING_RANK_TO_ROWINDEX[rank];

  return boardData[row][col];
};

export default getSquareData;