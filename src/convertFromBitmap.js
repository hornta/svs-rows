export default (row) => {
  if (typeof row !== "string") {
    throw new TypeError("row must be of type string");
  }

  const bitmaps = ["1", "X", "1X", "2", "12", "X2", "1X2"];
  const converted = [];

  for (let k = 0; k < row.length; ++k) {
    const char = row[k].toLowerCase();

    if (isNaN(parseInt(char, 10)) || char === "d" || char === "0") {
      continue;
    }

    converted.push(bitmaps[char - 1]);
  }

  return converted;
};
