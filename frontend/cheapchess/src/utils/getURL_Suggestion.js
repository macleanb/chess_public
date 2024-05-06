/* Internal Libraries */
import constants from '../constants';

const getURL_Suggestion = (gameID) => {
  return constants.URL_BACKEND_BASE + '/suggestion/' + gameID + '/';
};

export default getURL_Suggestion;