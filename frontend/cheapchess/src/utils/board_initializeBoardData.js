/* Internal Imports */
import constants from '../constants';
import emptySquareData from './square_emptySquareData';
import getFileFromRankFileStr from './square_getFileFromRankFileStr';
import getRankFileStr from './getRankFileStr';
import getRankFromRankFileStr from './square_getRankFromRankFileStr';
import pieceData from './piece_PieceData';

/**
 * Creates an 8x8 (2D) array with pieces in their starting places
 * @param {Object} iconData 
 * @returns {Array}
 */
const initializeBoardData = (iconData) => {

  /* Throw an error if iconData isn't an object (dictionary) */
  if (typeof iconData !== 'object' || Array.isArray(iconData) || iconData.constructor !== Object) {
    throw new TypeError('Could not initialize board data because icon data was invalid.');
  }

  const result = [];

  for (let rowIndex = 0; rowIndex < constants.BOARD_ROWS; rowIndex++) {
    const row = [];

    for (let colIndex = 0; colIndex < constants.BOARD_COLS; colIndex++) {
      /* Initialize squareData with a color, file, and rank (piece = null) */
      const color = (rowIndex + colIndex) % 2 === 0
                    ? constants.COLOR_SQUARE_LIGHT
                    : constants.COLOR_SQUARE_DARK;

      const squareData = emptySquareData(
        color,
        constants.MAPPING_COLINDEX_TO_FILE[colIndex],
        constants.MAPPING_ROWINDEX_TO_RANK[rowIndex]
      );

      /* Create a query key to see if this square should have a piece. */
      const squareRankFileStr = getRankFileStr(rowIndex, colIndex);

      /* If this square should have a piece, add a piece icon */
      if (constants.MAPPING_BOARD_INITIAL_PIECE_PLACES.hasOwnProperty(squareRankFileStr)) {
        /* Get the piece name from mapping */
        const pieceName = constants.MAPPING_BOARD_INITIAL_PIECE_PLACES[squareRankFileStr];

        /* Ensure iconData has this piece name */
        if (iconData.hasOwnProperty(pieceName)) {
          const singlePieceIconData = iconData[pieceName];

          if (singlePieceIconData.hasOwnProperty(constants.FIELD_NAME_ICON_DESCRIPTION) &&
              singlePieceIconData.hasOwnProperty(constants.FIELD_NAME_ICON_IMAGE)) {
            
            /* Create a new pieceData object for this icon */
            let pieceColor = constants.COLOR_PIECE_DARK; // default
            if (pieceName.startsWith(constants.COLOR_PIECE_LIGHT)) {
             pieceColor = constants.COLOR_PIECE_LIGHT; 
            }
            
            const piece = pieceData(
              pieceColor,
              getFileFromRankFileStr(squareRankFileStr), // current file
              getRankFromRankFileStr(squareRankFileStr), // current rank
              singlePieceIconData[constants.FIELD_NAME_ICON_DESCRIPTION],
              singlePieceIconData[constants.FIELD_NAME_ICON_IMAGE],
              pieceName,
              getFileFromRankFileStr(squareRankFileStr), // starting file
              getRankFromRankFileStr(squareRankFileStr), // starting rank
              pieceName.split(pieceColor)[1] // grabs just the piece type from pieceName
            );

            /* Add the pieceData to the squareData */
            squareData.piece = piece;
            
          } else {
            throw new ReferenceError('Could not initialize board with required piece because ' +
                                     'icon data lacks required properties')
          }
        } else {
          throw new ReferenceError('Could not initialize board with required piece because no ' +
                                   `icon exists with the name ${pieceName}`)
        }
      }
      row.push(squareData);
    }

    result.push(row);
  }

  return result;
};

export default initializeBoardData;