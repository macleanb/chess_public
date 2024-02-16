/**
 * Returns a single str character representing the file of a 
 * chess piece.
 * @param {str} rankFileStr i.e. 'a1'
 * @returns {str}
*/
const getFileFromRankFileStr = (rankFileStr) => {
  return rankFileStr[0];
};

export default getFileFromRankFileStr;