/* Internal Imports */
import constants from '../constants';
import isSquare from './square_isSquare';
/**
 * Returns squareData from boardData
 * @param {Array} boardData
 * @param {str} square // i.e. 'a1'
 * @param {str} playerColor // i.e. 'light'
 * @returns {Object}
 */
const getSquareData = (boardData, square, playerColor) => {
  if (!isSquare(square)) {
    throw new TypeError(`Square provided to getSquareData was invalid (${square})`);
  } else if (!Array.isArray(boardData)) {
    throw new TypeError(`BoardData provided to getSquareData was invalid (${boardData})`);
  } else if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to getSquareData was invalid (${playerColor})`);
  }

  const rank = square[1];
  const file = square[0];

  /* Return the appropriate squareData from boardData depending on
     whether the board is oriented toward a player with light pieces
     or a player with dark pieces. */
  let row;
  let col;
  if (playerColor === constants.COLOR_PIECE_LIGHT) {
    col = constants.MAPPING_FILE_TO_COLINDEX_LIGHT[file];
    row = constants.MAPPING_RANK_TO_ROWINDEX_LIGHT[rank];
  } else {
    col = constants.MAPPING_FILE_TO_COLINDEX_DARK[file];
    row = constants.MAPPING_RANK_TO_ROWINDEX_DARK[rank];
  }

  return boardData[row][col];
};

export default getSquareData;