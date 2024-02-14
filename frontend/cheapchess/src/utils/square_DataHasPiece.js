/**
 * Returns true if squareData is an object with a piece
 * property that is not null.  Otherwise returns false.
 * @param {Object} squareData 
 * @returns {boolean}
 */
const squareDataHasPiece = (squareData) => {
  if (typeof squareData === 'object' && !Array.isArray(squareData) && squareData.constructor === Object) {
    if (squareData.hasOwnProperty('piece') && squareData.piece !== null) {
      return true;
    }
  }
  return false;
};

export default squareDataHasPiece;