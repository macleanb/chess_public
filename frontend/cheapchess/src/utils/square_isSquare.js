/* Internal Imports */
import constants from "../constants";
import getFileFromRankFileStr from './square_getFileFromRankFileStr';
import getRankFromRankFileStr from './square_getRankFromRankFileStr';

/**
 * Returns true if the str argument is a square
 * @param {str} str
 * @returns {boolean}
 */
const isSquare = (
  str
  ) =>
{
  const rank = getRankFromRankFileStr(str);
  const file = getFileFromRankFileStr(str);
  return constants.BOARD_RANKS.includes(rank) && constants.BOARD_FILES.includes(file);;
};

export default isSquare;