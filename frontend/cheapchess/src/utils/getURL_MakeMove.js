/* Internal Libraries */
import constants from '../constants';

const getURL_MakeMove = (gameID) => {
  return constants.URL_GAMES + gameID + '/';
};

export default getURL_MakeMove;