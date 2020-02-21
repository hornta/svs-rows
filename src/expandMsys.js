import expandHedges from "./expandHedges.js";

export default (row) => {
  if (!Array.isArray(row)) {
    row = [];
  }

  const hedges = [];
  let rows = [];

  row.forEach((rowItem, index) => {
    if (rowItem.length > 1) {
      hedges.push({
        position: index,
        marks: rowItem
      });
    }
  });

  if (hedges.length) {
    rows = expandHedges(row.slice(0), 0, hedges);
  } else {
    rows = row;
  }

  return rows;
};
