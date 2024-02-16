/* Internal Imports */
import getExclusiveRange from './getExclusiveRange';
import isSquare from './square_isSquare';

/**
 * Returns an array of squares between origin
 * and destination, not including origin or destination
 * @param {str} origin
 * @param {str} destination
 * @returns {Array}
 */
const getSquaresBetween = (origin, destination) => {
  if (!isSquare(origin)) {
    throw new TypeError(`The origin provided to getSquaresBetween() is not a square (${origin})`);
  } else if (!isSquare(destination)) {
    throw new TypeError(`The destination provided to getSquaresBetween() is not a square (${destination})`);
  } else if (origin === destination) {
    return [];
  }

  const originRank = origin[1];
  const destinationRank = destination[1];
  const originFile = origin[0];
  const destinationFile = destination[0];
  const originRank_int = parseInt(originRank);
  const destinationRank_int = parseInt(destinationRank);
  const originFile_int = originFile.charCodeAt(0);
  const destinationFile_int = destinationFile.charCodeAt(0);

  /* If there is a difference between originRank_int and destinationRank_int,
     make sure that either:
     1) There is no difference between originFile_int and destinationFile_int, or
     2) the difference between originFile_int and destinatinonFile_int is 
        exactly the same as the difference between originRank_int and 
        destinationRank_int */
  if (originRank_int !== destinationRank_int && originFile_int !== destinationFile_int) {
    const absRankDifference = Math.abs(originRank_int - destinationRank_int);
    const absFileDifference = Math.abs(originFile_int - destinationFile_int);

    if (absRankDifference !== absFileDifference) {
      // Origin and Destination squares aren't on the same line
      return [];
    }
  }

  const orderedRanks = getExclusiveRange(originRank_int, destinationRank_int).map((rank_int) => {
    return rank_int.toString();
  });

  const orderedFiles = getExclusiveRange(originFile_int, destinationFile_int).map((file_int) => {
    return String.fromCharCode(file_int);
  });

  /* Merge ordered ranks and ordered files into a single ordered result */
  const result = [];
  if (orderedRanks.length === 0) { // ranks don't change
    const rankToRepeat = originRank;
    for (const file of orderedFiles) {
      result.push(file + rankToRepeat);
    }
  } else if (orderedFiles.length === 0) { // files don't change
    const fileToRepeat = originFile;
    for (const rank of orderedRanks) {
      result.push(fileToRepeat + rank);
    }
  } else { // ranks and files both vary
    for (let i = 0; i < orderedRanks.length; i++) {
      result.push(orderedFiles[i] + orderedRanks[i]);
    }
  }

  return result;
};

export default getSquaresBetween;