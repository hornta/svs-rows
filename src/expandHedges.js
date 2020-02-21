const expandHedges = (row, currentMark, marks) => {
  let combinedRows = [];

  if (marks.length === currentMark) {
    return [];
  }

  const currentMarkLength = marks[currentMark].marks.length;

  for (let i = 0; i < currentMarkLength; ++i) {
    row[marks[currentMark].position] = marks[currentMark].marks[i];

    if (currentMark === marks.length - 1) {
      combinedRows.push(row.slice(0));
    }

    combinedRows = combinedRows.concat(
      expandHedges(row, currentMark + 1, marks)
    );
  }

  return combinedRows;
};

export default expandHedges;
