/* Internal Imports */
import constants from '../constants';

/**
 * Returns a 1D array of all square IDs (file + rank strings).
 * i.e. ['a1', 'a2', 'a3', ...]
 * @returns {Array}
*/
const getAllSquareIDs = () => {
  const result = [];

  for (const file of constants.BOARD_FILES) {
    for (const rank of constants.BOARD_RANKS) {
      result.push(file + rank);
    }
  }

  return result;
};

export default getAllSquareIDs;