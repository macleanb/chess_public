/* Internal Imports */
import getClient from "./api_GetClient";
import getURL_Help from './getURL_Help';

/**
 * Returns a list of possible moves
 */
const apiGetPossibleMoves = async (
  boardDescription,
  pieceDescription
  ) =>
{
  try {
    const url = getURL_Help();
    const client = getClient();
    const requestData = {
      boardDescription   :   boardDescription,
      pieceDescription   :   pieceDescription
    }

    const response = await client.post(
      url,
      requestData,
      {
        headers: {
          'Content-Type' : 'application/json',
        },
      },
    );
    return response;
  } catch (e) {
      console.log(e);
  }
};

export default apiGetPossibleMoves;