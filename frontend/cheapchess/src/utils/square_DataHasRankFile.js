/**
 * Returns true if squareData is an object with rank and file
 * properties that are not null.  Otherwise returns false.
 * @param {Object} squareData 
 * @returns {boolean}
 */
const squareDataHasRankFile = (squareData) => {
  if (typeof squareData === 'object' && !Array.isArray(squareData) && squareData.constructor === Object) {
    if (!squareData.hasOwnProperty('rank') || squareData.rank === null) {
      return false; // invalid square data
    }

    if (!squareData.hasOwnProperty('file') || squareData.file === null) {
      return false; // invalid square data
    }

    return true;
  }
  return false;
};

export default squareDataHasRankFile;