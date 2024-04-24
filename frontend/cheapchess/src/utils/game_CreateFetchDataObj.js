/**
 * This will return an object with all required properties to guide
 * game fetching behavior from backend.
 * @param {string} requestedPlayerColor
 * @param {int} gameID
 * @param {string} requestedGameType // Should be one of the values in constants
 * @param {boolean} playComputer
 * @returns {Object}
 */
const createGameFetchDataObj = (
  requestedPlayerColor,
  gameID, 
  requestedGameType,
  playComputer
) =>
{
  return {
    requestedPlayerColor : requestedPlayerColor,
    gameID               : gameID,
    requestedGameType    : requestedGameType,
    playComputer         : playComputer
  };
};

export default createGameFetchDataObj;
