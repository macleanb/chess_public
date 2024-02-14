/* Internal Imports */
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_Icon from './getURL_Icon';

/* Retrieves a single icon from the backend server */
const getIcon = async (iconName, setMessages) => {
  try {
    const iconURL = getURL_Icon(iconName);
    const client = getClient();
    const response = await client.get(iconURL);
    return await response?.data;
  } catch (e) {
    console.log(e);
    setMessages(getResponseError(e));
  }
};

export default getIcon;