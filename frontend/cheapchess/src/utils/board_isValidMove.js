/**
 * Return true if the desired move is valid, false otherwise.
 * 
 * Takes in destination square data.  If the desired
 * destination square is highlighted green (indicating a possible
 * move by OpenAI), return true.  False otherwise.
 * 
 * @param {Object} destinationSquareData An object with a single square's data
 * @returns {boolean}
 *  */ 
const isValidMove = (destinationSquareData) => {
  /* See if the destination square is highlighted green */
  if (destinationSquareData.color === 'greensquare') {
    return true;
  }

  return false;
};

export default isValidMove;