import convertFromBitmap from "./convertFromBitmap.js";
import expandMsys from "./expandMsys.js";
import expandSystem from "./expandSystem.js";
import { SROW, RSYS, USYS, MSYS, types } from "./systemType.js";

export default ({ row, systemType, systemNum, uRow }) => {
  if (!types.includes(systemType)) {
    throw new TypeError(
      "Provided system type must be one of " +
        types.join(", ") +
        ". Got `" +
        systemType +
        "`."
    );
  }

  if ((systemType === RSYS || systemType === USYS) && !systemNum) {
    throw new TypeError(
      "A system number must be provided because the system type is either " +
        RSYS +
        " or " +
        USYS
    );
  }

  switch (systemType) {
    case MSYS:
      return expandMsys(row);
    case RSYS:
    case USYS:
      return expandSystem(systemNum, row, uRow);
    case SROW:
      return row;
    default:
  }

  boards = convertFromBitmap(boards);
  const singleRows = [];

  for (let i = 0; i < boards.length; i++) {
    boards[i].forEach((mark, k) => {
      if (mark === "1X" || mark === "X2" || mark === "12") {
        mark = mark.split("");
        boards[i][k] = mark[0];
        const additionalBoard = [];

        for (let j = 0; j < boards[i].length; j++) {
          if (j === k) additionalBoard[j] = mark[1];
          else additionalBoard[j] = boards[i][j];
        }

        boards.push(additionalBoard);
      }

      if (mark === "1X2") {
        mark = mark.split("");
        boards[i][k] = mark[0];
        const additionalBoardX = [],
          additionalBoard2 = [];

        for (let j = 0; j < boards[i].length; j++) {
          if (j === k) {
            additionalBoardX[j] = mark[1];
            additionalBoard2[j] = mark[2];
          } else {
            additionalBoardX[j] = boards[i][j];
            additionalBoard2[j] = boards[i][j];
          }
        }

        boards.push(additionalBoardX);
        boards.push(additionalBoard2);
      }
    });
    singleRows.push(boards[i]);
  }

  return singleRows;
};
