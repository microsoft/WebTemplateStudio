const fs = require("fs");
const fse = require("fs-extra");
const childProcess = require("child_process");

let buildFolder = "./build";
let publishBuildFolder = "../publish/build";

//delete folders build & publish/build
if (fs.existsSync(buildFolder)) {
    fse.removeSync(buildFolder);
}
if (fs.existsSync(publishBuildFolder)) {
    fse.removeSync(publishBuildFolder);
}

//Create frontend build and move to publish
childProcess.execSync("ng build", { stdio: "inherit" });
fse.moveSync(buildFolder, publishBuildFolder, { overwrite: true });
