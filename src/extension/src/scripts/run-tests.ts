let child_process = require("child_process");
const fs = require("fs");
//const rimraf = require("rimraf");
const testFolder = "../../src/template_test";
let files: string[] = [];
fs.readdirSync(testFolder).forEach((file: string) => {
  files.push(file.toString());
});

console.log("========>files: " + files);

let killport = (port: number) => {
  try {
    let tempPort = child_process.execSync(`netstat -aon | findstr "${port}"`, {
      stdio: "pipe"
    });
    let result = tempPort.toString();
    let resultArr = result.split("\n");
    resultArr.pop();
    resultArr.forEach((item: string) => {
      let temp = item
        .trim()
        .replace(/  +/g, " ")
        .split(" ")
        .pop();
      child_process.execSync(`taskkill -F /PID ${temp}`, {
        stdio: "inherit"
      });
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteFolderRecursive = function(path: string) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file: string, index: number) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    //rimraf.sync("/some/directory");
    fs.rmdirSync(path);
  }
};

files.forEach((file: string) => {
  console.log("file ====================>" + file);
  console.log(`this is what is passed in: ${file}`);
  const currDir = `../../src/template_test/${file}/${file}`;
  child_process.execSync("yarn install", {
    cwd: currDir,
    stdio: "inherit"
  });
  try {
    child_process.execSync("yarn start", {
      cwd: `../../src/template_test/${file}/${file}`,
      stdio: "inherit",
      timeout: 70000
    });
  } catch (err) {
    if (err.code == "ETIMEDOUT") {
      killport(3000);
      killport(3001);
      killport(3002);
    } else {
      throw err;
    }
  }
  // child_process.execSync("yarn test", {
  //   cwd: `../../src/template_test/${file}/${file}`,
  //   stdio: "inherit"
  // })
});

deleteFolderRecursive(testFolder);

if (!fs.existsSync(testFolder)) {
  fs.mkdirSync(testFolder);
}
