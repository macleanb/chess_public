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
const getRankFileStr = (rowIndex, colIndex) => {
    return constants.MAPPING_COLINDEX_TO_FILE[colIndex] +
    constants.MAPPING_ROWINDEX_TO_RANK[rowIndex];
};

export default getRankFileStr;