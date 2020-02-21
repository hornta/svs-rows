import expandGame1x2Board from "../src/expandGame1x2Board.js";

const game1x2Boards = [
  {
    boardProps: [],
    systemType: ["USYS"],
    systemNum: 59,
    boardData: [
      "1",
      "1X",
      "X",
      "2",
      "X",
      "1X",
      "X2",
      "X2",
      "2",
      "1X",
      "1X",
      "X2",
      "X"
    ]
  },
  {
    boardProps: [],
    systemType: ["UROW"],
    systemNum: 0,
    boardData: ["0", "1", "0", "0", "0", "X", "X", "2", "0", "X", "X", "X", "0"]
  }
];

console.log(expandGame1x2Board(game1x2Boards));
