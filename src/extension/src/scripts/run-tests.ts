const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const del = require("del");
const warningColor = "\x1b[33m%s\x1b[0m";

const testFolder = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "template_test"
);
console.log(`Run test scripts from ${testFolder}`);

let files: string[] = [];
fs.readdirSync(testFolder).forEach((file: string) => {
  files.push(file.toString());
});

async function asyncForEach(array: string[], callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

asyncForEach(files, async (file: string) => {
  console.log(`Current file: ${file}`);

  let packageJsonFile = path.join(testFolder, file, file, "package.json");
  let packageJson = require(packageJsonFile);

  // TODO: Enable when Vue project has test script
  // if(!packageJson.scripts.test) {
  //  throw new Error(`Not test script in ${file}`);
  // }

  if (!packageJson.scripts.lint) {
    throw new Error(`Not lint script in ${file}`);
  }

  installDependencies(file);
  executeLintScript(file);
  await executeStartScript(file);
  await executeTestScript(file, packageJson);
})
  .then(() => deleteProject())
  .catch(err => {
    throw err;
  });

function installDependencies(file: string) {
  console.log("Installing dependencies");
  const currDir = path.join(testFolder, file, file);
  child_process.execSync("yarn install", {
    cwd: currDir,
    stdio: "inherit",
    maxBuffer: 1024 * 1024
  });

  if (file.indexOf("Flask") > -1) {
    console.log("Installing Python dependencies");
    child_process.execSync("yarn install-requirements", {
      cwd: currDir,
      stdio: "inherit",
      maxBuffer: 1024 * 1024
    });
  }
}

function executeLintScript(file: string) {
  try {
    child_process.execSync("yarn lint --no-fix", {
      cwd: path.join(testFolder, file, file),
      stdio: "inherit",
      maxBuffer: 1024 * 1024
    });
  } catch (err) {
    throw err;
  }
}

async function executeStartScript(file: string) {
  let serverProcess;
  try {
    serverProcess = child_process.exec(
      "yarn start",
      {
        cwd: path.join(testFolder, file, file),
        stdio: "inherit",
        maxBuffer: 1024 * 1024
      },
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Error from running yarn start: ${error}`);
          return;
        }
        if (stderr) {
          throw stderr;
        }
        console.log(`Stdout from yarn start: ${stdout}`);
      }
    );
    serverProcess.stdout.on("data", (data: any) => {
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
}

async function executeTestScript(file: string, packageJson: any) {
  let testProcess;
  try {
    if (packageJson.scripts.test) {
      testProcess = child_process.exec(
        "yarn test",
        {
          cwd: path.join(testFolder, file, file),
          stdio: "inherit",
          maxBuffer: 1024 * 1024
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
        }
      );
      testProcess.stdout.on("data", (data: any) => {
        console.log(data);
        if (data.toString().indexOf("FAILED") > -1) {
          throw new Error("Error: Test failed");
        }
      });
    } else {
      console.warn(warningColor, `The test script was not found in ${file}`);
    }
  } catch (err) {
    console.log("Test errored out");
    throw err;
  }
  await sleep(80000);
  kill(testProcess.pid);
}

function deleteProject() {
  console.log("Deleting generated projects");
  del.sync(testFolder);
  console.log("Finished deleting projects");
  if (!fs.existsSync(testFolder)) {
    fs.mkdirSync(testFolder);
  }
}

function kill(pid: any) {
  try {
    child_process.execSync(
      "taskkill /PID " + pid + " /T /F",
      (error: any, stdout: any, stderr: any) => {
        console.log("Stdout from kill: " + stdout);
        console.log("Stderr from kill:" + stderr);
        if (error !== null) {
          console.log("Error from kill: " + error);
        }
      }
    );
  } catch (err) {
    console.log(`Error from taskkill: ${err}`);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
