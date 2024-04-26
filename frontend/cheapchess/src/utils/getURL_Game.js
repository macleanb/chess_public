/* Internal Libraries */
import constants from '../constants';

const getURL_Game = (gameID) => {
  return constants.URL_GAMES + gameID + '/';
};

export default getURL_Game;