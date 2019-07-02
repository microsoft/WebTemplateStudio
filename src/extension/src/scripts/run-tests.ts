let child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const testFolder = path.join("..", "..", "src", "template_test");
let files: string[] = [];

var psTree = require('ps-tree');

var kill = function (pid: any, signal:any , callback:any) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err: Error, children: any) {
            [pid].concat(
                children.map(function (p: any) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

// ... somewhere in the code of Yez!
kill(child.pid);
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
    fs.rmdirSync(path);
  }
};

files.forEach((file: string) => {
  console.log("file ====================>" + file);
  console.log(`this is what is passed in: ${file}`);
  let currDir = path.join("..", "..", "src", "template_test", file, file);
  child_process.execSync("yarn install", {
    cwd: currDir,
    stdio: "inherit"
  });
  try {
    child_process.execSync("yarn start", {
      cwd: currDir,
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
