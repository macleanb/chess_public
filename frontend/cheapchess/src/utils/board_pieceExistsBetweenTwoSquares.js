/* Internal Imports */
import constants from '../constants';
import getSquaresBetween from './board_getSquaresBetween';
import getSquareData from './board_getSquareData';
import isSquare from './square_isSquare';

/**
 * Returns true if a piece is on any square between
 * squareOne and squareTwo
 * @param {Array} boardData
 * @param {str} squareOne
 * @param {str} squareTwo
 * @returns {boolean}
 */
const pieceExistsBetweenTwoSquares = (
  boardData,
  squareOne,
  squareTwo,
  playerColor
  ) => {
  if (!isSquare(squareOne)) {
    throw new TypeError(`SquareOne arg provided to pieceExistsBetweenTwoSquares is invalid (${squareOne})`);
  } else if (!isSquare(squareTwo)) {
    throw new TypeError(`SquareTwo arg provided to pieceExistsBetweenTwoSquares is invalid (${squareTwo})`);
  } else if (!Array.isArray(boardData)) {
    throw new TypeError(`BoardData arg provided to pieceExistsBetweenTwoSquares is invalid.`);
  } else if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to pieceExistsBetweenTwoSquares was invalid (${playerColor})`);
  }

  const squaresBetween = getSquaresBetween(squareOne, squareTwo);

  for (const square of squaresBetween) {
    const squareData = getSquareData(
      boardData,
      square,
      playerColor
      );
    if (squareData.hasOwnProperty('piece') && squareData.piece !== null) {
      return true;
    }
  }
  return false;
};

export default pieceExistsBetweenTwoSquares;