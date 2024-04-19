/* Creates a dictionary object representing a square
   on a chessboard but with no piece assigned */

/* Internal Imports */
import constants from '../constants';
import validateStrArg from './validateStrArg';

const emptySquareData = (color, file, rank) => {
  validateStrArg(rank, constants.REGEX_RANKS, `invalid rank argument (${rank}) passed to emptySquareData`);
  validateStrArg(file, constants.REGEX_FILES, `invalid file argument (${file}) passed to emptySquareData`);

  const result = {
    rank  : rank, // [12345678]
    file  : file, // [abcdefgh]
    color : color,
    piece : null,
    selected : false // indicates whether the user has clicked on it or not
  };
  return result;
};

export default emptySquareData;