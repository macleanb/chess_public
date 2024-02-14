/* Internal Imports */
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_Icons from './getURL_Icons';

/* Retrieves all icons from the backend server */
const getIcons = async (setMessages) => {
  try {
    const iconURL = getURL_Icons();
    const client = getClient();
    const response = await client.get(iconURL);
    return await response?.data;
  } catch (e) {
    console.log(e);
    setMessages(getResponseError(e));
  }
};

export default getIcons;