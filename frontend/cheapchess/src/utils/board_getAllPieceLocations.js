/* Internal Imports */
import constants from '../constants';
import getAllSquareIDs from "./square_getAllSquareIDs";
import getSquareData from "./board_getSquareData";

/**
 * Returns a string of the locations of all the pieces
 * on the board
 * @param {Array} boardData
 * @param {string} playerColor
 * @returns {string}
 */
const getAllPieceLocations = (
  boardData,
  playerColor
  ) =>
{
  if (!Array.isArray(boardData)) {
    throw new TypeError(`BoardData provided to getAllPieceLocations was invalid (${boardData})`);
  } else if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to getAllPieceLocations was invalid (${playerColor})`);
  }

  let result = '';
  const allSquareIDs = getAllSquareIDs();

  for (const squareID of allSquareIDs) {
    const squareData = getSquareData(
      boardData,
      squareID,
      playerColor
      );
    
    if (squareData.piece !== null) {
      const piece = squareData.piece;
      const pieceString = `Square ${squareID} has a ` +
                          `${piece.color} ${piece.piece_type} piece that ` +
                          `${piece.first_move_made ? 'has already' : 'has not yet'} ` +
                          `moved during this game.\n`;
      result += pieceString;
    }
  }

  return result;
};

export default getAllPieceLocations;