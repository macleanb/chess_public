/* Internal Imports */
import constants from '../constants';
import emptySquareData from './square_emptySquareData';

/**
 * Creates an 8x8 (2D) array with squares (colors, files/ranks)
 * based on playerColor, without pieces
 * @param {str} playerColor 
 * @returns {Array}
 */
const initializeBoardData = (playerColor) =>
{
  /* Throw an error if param(s) are invalid */
  if (playerColor !== constants.COLOR_PIECE_LIGHT && playerColor !== constants.COLOR_PIECE_DARK) {
    throw new TypeError(`playerColor provided to initializeBoardData was invalid (${playerColor})`);
  }

  const result = [];

  for (let rowIndex = 0; rowIndex < constants.BOARD_ROWS; rowIndex++) {
    const row = [];

    for (let colIndex = 0; colIndex < constants.BOARD_COLS; colIndex++) {
      /* Initialize squareData with a color, file, and rank (piece = null) */
      const color = (rowIndex + colIndex) % 2 === 0
                    ? constants.COLOR_SQUARE_LIGHT
                    : constants.COLOR_SQUARE_DARK;

      let squareData;
      if (playerColor === constants.COLOR_PIECE_LIGHT) {
        squareData = emptySquareData(
          color,
          constants.MAPPING_COLINDEX_TO_FILE_LIGHT[colIndex],
          constants.MAPPING_ROWINDEX_TO_RANK_LIGHT[rowIndex]
        );
      } else {
        squareData = emptySquareData(
          color,
          constants.MAPPING_COLINDEX_TO_FILE_DARK[colIndex],
          constants.MAPPING_ROWINDEX_TO_RANK_DARK[rowIndex]
        );
      }
      row.push(squareData);
    }
    result.push(row);
  }

  return result;
};

export default initializeBoardData;