const fs = require("fs");
const fse = require("fs-extra");
const childProcess = require("child_process");

//Build client app
if (fs.existsSync("./build")) {
  fse.removeSync("./build");
}
childProcess.execSync("vue-cli-service build", { stdio: "inherit" });

//Move client
