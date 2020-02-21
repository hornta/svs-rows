import expandScoreBoard from "./expandScoreBoard.js";

export default (expertenBoardData) => {
  const rows = expandScoreBoard(expertenBoardData);
  return rows.map((row) =>
    row.reduce((acc, value) => [...acc, value[0], value[1]], [])
  );
};
