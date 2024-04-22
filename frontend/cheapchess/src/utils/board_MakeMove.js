/* Internal Imports */
import api_MakeMove from "./api_MakeMove";

const makeMove = async (
  gameID,
  pieceID,
  destinationSquareID,
  setGameDataFromServer,
  setMessages
) => {

  const formData = {
    pieceID : pieceID,
    destinationSquareID : destinationSquareID
  }

  const response = await api_MakeMove(
    gameID, 
    formData,
    setMessages
  );

  // TODO uncomment
  // setGameDataFromServer(response.data);
  return response.data;
};

export default makeMove;