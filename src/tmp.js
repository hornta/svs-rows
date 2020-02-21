import fs from "fs";
import path from "path";

function readFilesSync(dir) {
  const files = [];

  fs.readdirSync(dir).forEach((filename) => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    const content = JSON.stringify(fs.readFileSync(filename));

    if (isFile) files.push({ filepath, name, ext, stat });
  });

  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base"
    });
  });

  return files;
}

const files = readFilesSync("src/systems");
files.forEach((file) => {
  console.log(
    "import " +
      file.name.replace("_", "") +
      " from " +
      '"./systems/' +
      file.name +
      file.ext +
      '"'
  );
});

console.log("export default {");
files.forEach((file) => {
  console.log(
    "import " +
      file.name.replace("_", "") +
      " from " +
      '"./systems/' +
      file.name +
      file.ext +
      '"'
  );
});
console.log("}");
