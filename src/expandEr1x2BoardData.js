import convertFromBitmap from "./convertFromBitmap.js";

export default (er1x2BoardData) => {
  const rows = [];
  er1x2BoardData.boards.forEach((board) => {
    rows.push(convertFromBitmap(board));
  });
  return rows;
};
