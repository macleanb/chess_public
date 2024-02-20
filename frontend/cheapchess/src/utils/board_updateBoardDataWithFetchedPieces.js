/* Internal Imports */
import constants from '../constants';
import getSquareData from './board_getSquareData';
import removeAllPieces from './piece_RemoveAllPieces';

/**
 * Copies boardData.
 * Updates copied boardData with pieces, icons, from backend server.
 * Returns copied boardData
 * @param {Array} boardData
 * @param {Object} fetchedData
 * @param {str} playerColor
 * @returns {Array}
 */
const updateBoardDataWithFetchedPieces = (
  boardData,
  fetchedData,
  playerColor
  ) =>
{
  /* Throw errors for invalid params */
  if (!Array.isArray(boardData)) {
    throw new TypeError('Could not update board data because boardData was invalid.');
  } else if (typeof fetchedData !== 'object' || fetchedData.constructor !== Object) {
    throw new TypeError('Could not update board data because fetched data was invalid.');
  } else if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to sendFetchedGameDataToBoardData was invalid (${playerColor})`);
  }

  /* Get a copy of boardData will all pieces removed */
  const result = removeAllPieces(boardData);

  /* Iterate through all pieces from server game data and add
     them to copied boardData */
  for (const squareID of Object.keys(fetchedData.pieces)) {
    const squareData = getSquareData(
      result,
      squareID,
      playerColor
    );

    const piece = fetchedData.pieces[squareID];

    squareData.piece = piece;
  }

  return result;
};

export default updateBoardDataWithFetchedPieces;