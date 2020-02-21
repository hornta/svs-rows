import systems from "./systems.js";
import systemMapping from "./systemMapping.js";
import expandHedges from "./expandHedges.js";

const getExpandedRowsFromSingleRow = (system, row, urows) => {
  const fullHedgesIndices = [],
    halfHedgesIndices = [],
    singlesIndices = [],
    expandedRows = [],
    rowLength = row.length,
    marks = ["1", "X", "2"],
    halfMarks = {
      "1X": ["1", "X"],
      12: ["1", "2"],
      X2: ["X", "2"]
    },
    uMarks = {
      1: ["1", "X", "2"],
      X: ["X", "1", "2"],
      2: ["2", "1", "X"]
    },
    uHalfMarks = {
      1: {
        "1X": ["1", "X"],
        12: ["1", "2"]
      },
      X: {
        "1X": ["X", "1"],
        X2: ["X", "2"]
      },
      2: {
        12: ["2", "1"],
        X2: ["2", "X"]
      }
    },
    systemRows = systems[system],
    isUSystem = systemRows.systemType === "U";

  let currentFullIndex = null,
    currentHalfIndex = null;

  if (typeof systemRows === "undefined") {
    logger.error("Failed to find a system with name: ".concat(system));
    return;
  }

  for (let i = 0; i < rowLength; ++i) {
    if (row[i].length === 3) {
      fullHedgesIndices.push(i);
    } else if (row[i].length === 1) {
      singlesIndices.push(i);
    } else {
      halfHedgesIndices.push(i);
    }
  }

  const systemRowsLength = systemRows.rows.length,
    fullHedgesIndicesLength = fullHedgesIndices.length,
    halfHedgesIndicesLength = halfHedgesIndices.length;

  for (let i = 0; i < systemRowsLength; ++i) {
    currentFullIndex = -1;
    currentHalfIndex = fullHedgesIndicesLength - 1;
    expandedRows.push([]);

    for (let k = 0; k < fullHedgesIndicesLength; ++k) {
      if (isUSystem) {
        expandedRows[expandedRows.length - 1][fullHedgesIndices[k]] =
          uMarks[urows[fullHedgesIndices[k]]][
            systemRows.rows[i][++currentFullIndex]
          ];
      } else {
        expandedRows[expandedRows.length - 1][fullHedgesIndices[k]] =
          marks[systemRows.rows[i][++currentFullIndex]];
      }
    }

    for (let k = 0; k < halfHedgesIndicesLength; ++k) {
      if (isUSystem) {
        expandedRows[expandedRows.length - 1][halfHedgesIndices[k]] =
          uHalfMarks[urows[halfHedgesIndices[k]]][row[halfHedgesIndices[k]]][
            systemRows.rows[i][++currentHalfIndex]
          ];
      } else {
        expandedRows[expandedRows.length - 1][halfHedgesIndices[k]] =
          halfMarks[row[halfHedgesIndices[k]]][
            systemRows.rows[i][++currentHalfIndex]
          ];
      }
    }

    for (let k = 0; k < singlesIndices.length; ++k) {
      expandedRows[expandedRows.length - 1][singlesIndices[k]] =
        row[singlesIndices[k]];
    }
  }

  return expandedRows;
};

export default (system, row, uRows) => {
  //   if (typeof system !== "string" && typeof system !== "number") {
  //     logger.error(
  //       "First parameter must be of type string or number, ".concat(
  //         typeof system,
  //         " given"
  //       )
  //     );
  //     return;
  //   }

  //   if (!Array.isArray(row)) {
  //     logger.error(
  //       "Second parameter must be array, ".concat(typeof row, " given")
  //     );
  //     return;
  //   }

  const marks = [];
  const currentRow = row.slice(0);
  const currentRowLength = currentRow.length;
  let rowsToProcess = [],
    processedRows = [],
    rowsToProcessLength = 0;

  for (let i = 0; i < currentRowLength; i++) {
    if (currentRow[i].indexOf("M") !== -1) {
      marks.push({
        position: i,
        marks: currentRow[i].substr(0, currentRow[i].length - 1)
      });
    }
  }

  if (marks.length) {
    rowsToProcess = expandHedges(currentRow, 0, marks);
  } else {
    rowsToProcess.push(currentRow);
  }

  rowsToProcessLength = rowsToProcess.length;

  for (let i = 0; i < rowsToProcessLength; ++i) {
    processedRows = processedRows.concat(
      getExpandedRowsFromSingleRow(
        typeof system === "number" ? systemMapping[system] : system,
        rowsToProcess[i],
        uRows
      )
    );
  }

  return processedRows;
};
