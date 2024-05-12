/* Internal Imports */
import api_MakeMove from "./api_MakeMove";

const makeMove = async (
  gameID,
  pieceID,
  destinationSquareID,
  iconData,
  setGameDataFromServer,
  setMessages
) => {

  const formData = {
    pieceID : pieceID,
    destinationSquareID : destinationSquareID
  }

  const updatedGameData = await api_MakeMove(
    gameID, 
    formData,
    setMessages
  );

  /* For some reason the backend PieceSerializer wouldn't include full (absolute)
    file paths for icons, so we update those here */
  if (iconData) {
    console.log("This is my error", Object.keys(updatedGameData.pieces))
    for (const square of Object.keys(updatedGameData.pieces)) {
      const newGamePieceData = updatedGameData.pieces[square];
      const iconKey = newGamePieceData.color + newGamePieceData.piece_type;
      const directIconData = iconData[iconKey];
      newGamePieceData.fk_icon = directIconData;
    }
  }

  // TODO uncomment
  setGameDataFromServer(updatedGameData);
  return updatedGameData;
};

export default makeMove;