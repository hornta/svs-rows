export default (board) => {
  /*
    den här algoritmen kan förbättras genom att i samma steg som man expanderar till alla rader
    även exkludera de rader som är reducerade. nu är detta en tvåstegsraket där första steget 
    är att ta ut alla rader och andra steget är att ta bort reducerade rader.
  */
  const rowLength = board.boardData.length;

  const propagateIndicies = (rowIndex) => {
    if (rowIndex === rowLength) {
      return;
    }

    markIndicies[rowIndex] += 1;

    if (markIndicies[rowIndex] === board.boardData[rowIndex].length) {
      markIndicies[rowIndex] = 0;
      propagateIndicies(rowIndex + 1);
    }
  };

  const totalRows = board.boardData
    .map((marks) => marks.length)
    .reduce((acc, numMarks) => acc * numMarks, 1);
  const nonReducedRows = [];
  const markIndicies = {};

  for (let i = 0; i < rowLength; ++i) {
    markIndicies[i] = 0;
  }

  for (let i = 0; i < totalRows; ++i) {
    const row = [];

    for (let x = 0; x < rowLength; ++x) {
      const markIndex = markIndicies[x];
      row.push(board.boardData[x][markIndex]);
    }

    propagateIndicies(0);
    nonReducedRows.push(row);
  }

  if (!board.rSysData) {
    return nonReducedRows;
  }

  const reducedRows = nonReducedRows.filter((row) => {
    for (let i = 0; i < row.length; i += 2) {
      const rSys = board.rSysData[i / 2];

      if (rSys.indexOf("HOME") === -1) {
        if (Number(row[i]) > Number(row[i + 1])) {
          return false;
        }
      }

      if (rSys.indexOf("DRAW") === -1) {
        if (row[i] === row[i + 1]) {
          return false;
        }
      }

      if (rSys.indexOf("AWAY") === -1) {
        if (Number(row[i]) < Number(row[i + 1])) {
          return false;
        }
      }
    }

    return true;
  });
  return reducedRows;
};
