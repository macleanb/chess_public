/* Internal Imports */
import constants from '../constants';

/**
 * This function takes in a chess board
 * column index (file) and row index (rank)
 * and returns a string formatted to the 
 * conventional board square reference in chess:
 * <file letter a-h><rank number 1-8>
 * @param {int} rowIndex 0-7 array index of a chess board row
 * @param {int} colIndex 0-7 array index of a chess board column
 * @returns {string}
 */
const getRankFileStr = (rowIndex, colIndex, playerColor) => {
  if (!Number.isInteger(rowIndex) || rowIndex < 0 || rowIndex > 7) {
    throw new TypeError(`rowIndex provided to getRankFileStr was invalid (${rowIndex})`);
  } else if (!Number.isInteger(colIndex) || colIndex < 0 || colIndex > 7) {
    throw new TypeError(`colIndex provided to getRankFileStr was invalid (${colIndex})`);
  } else if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to getRankFileStr was invalid (${playerColor})`);
  }

  if (playerColor === constants.COLOR_PIECE_LIGHT) {
    return constants.MAPPING_COLINDEX_TO_FILE_LIGHT[colIndex] +
    constants.MAPPING_ROWINDEX_TO_RANK_LIGHT[rowIndex];
  } else {
    return constants.MAPPING_COLINDEX_TO_FILE_DARK[colIndex] +
    constants.MAPPING_ROWINDEX_TO_RANK_DARK[rowIndex];
  }
};

export default getRankFileStr;