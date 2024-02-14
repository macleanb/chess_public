/* Internal Libraries */
import constants from '../constants';

const getURL_Icon = (iconName) => {
  let result = null;
  if (iconName) {
    result = constants.URL_ICONS + iconName + '/';
  }
  return result;
};

export default getURL_Icon;