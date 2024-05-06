/* Internal Imports */
import getClient from "./api_GetClient";
import getCSRFToken from "./api_GetCSRFToken";
import getURL_Suggestion from './getURL_Suggestion';

/**
 * Returns a suggested move
 * @param {int} gameID
 * @returns {Array} // I.e. ['a2', 'a4']
 */
const apiGetSuggestedMoveStockfish = async (
    gameID
  ) =>
{
  try {
    const url = getURL_Suggestion(gameID);
    const client = getClient();
    const csrfToken = getCSRFToken();

    const response = await client.get(
      url,
      {
        headers: {
          'Content-Type' : 'application/json',
          "X-CSRFToken": csrfToken
        },
        withCredentials: true,
      },
    );

    const originSquareID = response.data.best_move.substring(0,2);
    const destinationSquareID = response.data.best_move.substring(2,4);
    const suggestedMove = [originSquareID, destinationSquareID];

    return suggestedMove;
  } catch (e) {
      console.log(e);
  }
};

export default apiGetSuggestedMoveStockfish;