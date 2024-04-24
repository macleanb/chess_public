/* Internal Imports */
import getClient from "./api_GetClient";
import getCSRFToken from "./api_GetCSRFToken";
import getURL_PlayableGames from './getURL_PlayableGames';

/**
 * Returns an Array of games that the logged-in user can play
 * @returns {Array}
 */
const getPlayableGames = async () =>
{
  try {
    const url = getURL_PlayableGames();
    const client = getClient();
    const csrfToken = getCSRFToken();
    const response = await client.get(
      url,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json',
          "X-CSRFToken": csrfToken
        },
        withCredentials: true,
      },
    );

    return response;
  } catch (e) {
      console.log(e);
  }
};

export default getPlayableGames;