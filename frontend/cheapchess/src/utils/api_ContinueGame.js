/* Internal Imports */
import getCSRFToken from './api_GetCSRFToken';
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_Game from './getURL_Game';

const continueGame = async (gameID, formData, setMessages) => {
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
    return await response.data;
  } catch (e) {
    /* It is possible for a user to logout after a game data
       refresh timeout has been set in Game.js.  If this happens,
       the backend will return an error 403 since the user
       is no longer authenticated by the time the fetch request
       is called. No need to display an error message in that case. */
    if (e?.response?.status !== 403) {
      setMessages(getResponseError(e));
    }
    console.log(e);
  }
};

export default continueGame;