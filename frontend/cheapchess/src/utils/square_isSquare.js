/* Internal Imports */
import constants from "../constants";

/**
 * Returns true if the str argument is a square
 * @param {str} str
 * @returns {boolean}
 */
const isSquare = (
  str
  ) =>
{
  const rank = str[1];
  const file = str[0];
  const allowedRanksArr = Object.keys(constants.MAPPING_RANK_TO_ROWINDEX_LIGHT);
  const allowedFilesArr = Object.keys(constants.MAPPING_FILE_TO_COLINDEX_LIGHT);
  const result = allowedRanksArr.includes(rank) && allowedFilesArr.includes(file);
  return result;
};

export default isSquare;