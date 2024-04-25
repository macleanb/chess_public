const updateIconURLs = (
  gameData,
  iconData
) => {
  if (iconData) {
    for (const square of Object.keys(gameData.pieces)) {
      const gamePieceData = gameData.pieces[square];
      const iconKey = gamePieceData.color + gamePieceData.piece_type;
      const directIconData = iconData[iconKey];
      gamePieceData.fk_icon = directIconData;
    }
  }

  return gameData;
};

export default updateIconURLs;