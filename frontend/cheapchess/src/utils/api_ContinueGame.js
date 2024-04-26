/* Internal Imports */
import getCSRFToken from './api_GetCSRFToken';
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_Game from './getURL_Game';

const api_ContinueGame = async (gameID, formData, setMessages) => {
  try {
    const gameURL = getURL_Game(gameID);
    const client = getClient();
    const csrfToken = getCSRFToken();

    const response = await client.get(
      gameURL,
      {
        headers: {
          Accept: 'application/json',
          "X-CSRFToken": csrfToken
        },
        withCredentials: true,
      }
    );
    return await response?.data;
  } catch (e) {
    console.log(e);
    setMessages(getResponseError(e));
  }
};

export default api_ContinueGame;