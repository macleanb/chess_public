/**
 * Returns an object (dictionary) containing piece data
 * and an icon
 * @param {str} pieceColor
 * @param {str} pieceCurrentPosFile
 * @param {str} pieceCurrentPosRank
 * @param {str} pieceDescription 
 * @param {str} pieceIcon
 * @param {str} pieceName
 * @param {str} pieceStartingPosFile
 * @param {str} pieceStartingPosRank
 * @param {str} pieceType
 */
const pieceData = (
  pieceColor,
  pieceCurrentPosFile,
  pieceCurrentPosRank,
  pieceDescription,
  pieceIcon,
  pieceName,
  pieceStartingPosFile,
  pieceStartingPosRank,
  pieceType,
  ) => {

  return {
    color          : pieceColor,
    currentFile    : pieceCurrentPosFile,
    currentRank    : pieceCurrentPosRank,
    description    : pieceDescription,
    firstMoveMade  : false,
    icon           : pieceIcon,
    name           : pieceName,
    startingFile   : pieceStartingPosFile,
    startingRank   : pieceStartingPosRank,
    type           : pieceType,
  }
};

export default pieceData;