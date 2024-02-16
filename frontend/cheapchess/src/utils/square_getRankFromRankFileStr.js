/**
 * Returns a single str character representing the rank of a 
 * chess piece.
 * @param {str} rankFileStr i.e. 'a1'
 * @returns {str}
*/
const getRankFromRankFileStr = (rankFileStr) => {
    return rankFileStr[1];
  };
  
  export default getRankFromRankFileStr;