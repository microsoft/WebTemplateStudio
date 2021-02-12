const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

let codeFolder = "../backend";
let publishFolder = "../publish";

//Clean publish directory
fs.readdirSync(publishFolder)
  .filter(item => item !== "build")
  .forEach(item => fse.removeSync(path.join(publishFolder, item)));

//copy backend to publish folder
const filterFunc = (src, dest) => {
  let validFile =
    src.indexOf("node_modules") < 0 &&
    src.indexOf("scripts") < 0;
  return validFile;
};

fse.copySync(codeFolder, publishFolder, filterFunc);
