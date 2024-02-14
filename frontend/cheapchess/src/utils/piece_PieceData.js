/**
 * Returns an object (dictionary) containing piece data
 * and an icon
 * @param {str} pieceName 
 * @param {str} pieceDescription 
 * @param {str} pieceIcon 
 */
const pieceData = (
  pieceName,
  pieceColor,
  pieceDescription,
  pieceIcon
  ) => {

  return {
    name        : pieceName,
    color       : pieceColor,
    description : pieceDescription,
    icon        : pieceIcon,
  }
};

export default pieceData;