/* Internal Imports */
import getCSRFToken from './api_GetCSRFToken';
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_MakeMove from './getURL_MakeMove';

/* Retrieves a single icon from the backend server */
const api_MakeMove = async (gameID, formData, setMessages) => {
  try {
    const makeMoveURL = getURL_MakeMove(gameID);
    const client = getClient();
    const csrfToken = getCSRFToken();
    const form_data = new FormData();

    if (formData) {
      form_data.append("put_type", "make_move");
      form_data.append("piece_id", formData.pieceID);
      form_data.append("destination_square_id", formData.destinationSquareID);
    }

    const response = await client.put(
      makeMoveURL,
      form_data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

export default api_MakeMove;