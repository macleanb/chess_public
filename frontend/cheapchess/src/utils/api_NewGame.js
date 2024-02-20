/* Internal Imports */
import getClient from './api_GetClient';
import getResponseError from './api_GetResponseError';
import getURL_Games from './getURL_Games';

/* Retrieves a single icon from the backend server */
const newGame = async (formData, setMessages) => {
  try {
    const gamesURL = getURL_Games();
    const client = getClient();
    const form_data = new FormData();

    if (formData) {
      form_data.append("player1_color", formData.player1Color);
    }
    const response = await client.post(
      gamesURL,
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return await response?.data;
  } catch (e) {
    console.log(e);
    setMessages(getResponseError(e));
  }
};

export default newGame;