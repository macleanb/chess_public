/**
 * This will return an object with all required properties to guide
 * game fetching behavior from backend.
 * @param {string} requestedPlayerColor
 * @param {int} gameID
 * @param {string} requestedGameType // Should be one of the values in constants
 * @param {boolean} playComputer
//  * @param {string} compDifficulty // Should be 4 choices: 'Easy', 'Medium', 'Hard', 'Grandmaster'
 * @returns {Object}
 */
const createGameFetchDataObj = (
  requestedPlayerColor,
  gameID, 
  requestedGameType,
  playComputer,
  //compDifficulty
) =>
{
  return {
    requestedPlayerColor : requestedPlayerColor,
    gameID               : gameID,
    requestedGameType    : requestedGameType,
    playComputer         : playComputer,
    // compDifficulty       : compDifficulty
  };
};

export default createGameFetchDataObj;
