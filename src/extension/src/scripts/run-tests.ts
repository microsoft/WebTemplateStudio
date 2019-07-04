let child_process = require("child_process");
const path = require("path");
const fs = require("fs");

const testFolder = path.join(__dirname, "..", "..", "src", "template_test");
console.log(testFolder);
let files: string[] = [];

//Recursively delete all generated projects in template_test
let deleteFolderRecursive = function(pathname: string) {
  let files = [];
  if (fs.existsSync(pathname)) {
    files = fs.readdirSync(pathname);
    files.forEach(function(file: string, index: number) {
      var curPath = path.join(pathname, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathname);
    console.log(`deleted ${pathname}`);
  }
};

fs.readdirSync(testFolder).forEach((file: string) => {
  files.push(file.toString());
});

function kill(pid: any) {
  try {
    child_process.execSync("taskkill /PID " + pid + " /T /F", function(
      error: any,
      stdout: any,
      stderr: any
    ) {
      console.log("Stdout from kill: " + stdout);
      console.log("Stderr from kill:" + stderr);
      if (error !== null) {
        console.log("Error from kill: " + error);
      }
    });
  } catch (err) {
    console.log(`Error from taskkill: ${err}`);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncForEach(array: string[], callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

asyncForEach(files, async (file: string) => {
  console.log(`Current file: ${file}`);

  const currDir = path.join(testFolder, file, file);
  child_process.execSync("yarn install", {
    cwd: currDir,
    stdio: "inherit"
  });
  let serverProcess;
  let testProcess;
  try {
    serverProcess = child_process.exec(
      "yarn start",
      {
        cwd: path.join(testFolder, file, file),
        stdio: "inherit"
      },
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Error from running yarn start: ${error}`); //TODO: mark failure
          return;
        }
        if (stderr) {
          throw stderr;
        }
        console.log(`Stdout from yarn start: ${stdout}`);
        console.log(`Stderr from yarn start: ${stderr}`);
      }
    );
    serverProcess.stdout.on("data", function(data: any) {
      console.log(data);
      if (data.toString().indexOf("Traceback") > -1) {
        throw new Error("Error found in project");
      }
    });
  } catch (err) {
    throw err;
  }

  console.log("Starting localhost");
  await sleep(60000);
  console.log("Localhost terminated");

  kill(serverProcess.pid);
  try {
    testProcess = child_process.exec(
      "yarn test",
      {
        cwd: path.join(testFolder, file, file),
        stdio: "inherit"
      },
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Error from running yarn test: ${error}`);
          return;
        }
        if (stderr) {
          throw stderr;
        }
        console.log(`Stdout from yarn test: ${stdout}`);
        console.log(`Stderr from yarn test: ${stderr}`);
      }
    );
    testProcess.stdout.on("data", function(data: any) {
      console.log(data);
      if (data.toString().indexOf("FAILED") > -1) {
        throw new Error("Error: Test failed");
      }
    });
  } catch (err) {
    console.log("Test errored out");
    throw err;
  }
  await sleep(80000);
  try {
    kill(testProcess.pid);
  } catch (err) {
    console.log(err);
  }
})
  .then(() => {
    console.log("Deleting generated projects");
    deleteFolderRecursive(testFolder);

    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder);
    }
  })
  .catch(err => {
    throw err;
  });
