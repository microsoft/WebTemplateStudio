const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const del = require("del");
const cyanColor = "\x1b[36m%s\x1b[0m";
const redColor = "\x1b[31m%s\x1b[0m";
const yellowColor = "\x1b[33m%s\x1b[0m";

const testFolder = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "template_test"
);
console.log(cyanColor, `Run test scripts from ${testFolder}`);

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
  console.log(cyanColor, `Current project: ${file}`);

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
    process.exitCode = 1;
    throw err;
  });

function installDependencies(file: string) {
  console.log(cyanColor, `Installing dependencies in ${file}`);
  try {
    const currDir = path.join(testFolder, file, file);
  child_process.execSync("yarn install", {
    cwd: currDir,
    stdio: "inherit",
    maxBuffer: 1024 * 1024
  });

  if (file.indexOf("Flask") > -1) {
    console.log(cyanColor, `Installing Python dependencies in ${file}`);
    child_process.execSync("yarn install-requirements", {
      cwd: currDir,
      stdio: "inherit",
      maxBuffer: 1024 * 1024
    });
  }
  } catch (err) {
    console.error(redColor, `Error from installing dependencies in ${file}: ${err}`);
    throw err;
  }
}

function executeLintScript(file: string) {
  console.log(cyanColor, `Execute lint script in ${file}`);
  try {
    child_process.execSync("yarn lint --no-fix", {
      cwd: path.join(testFolder, file, file),
      stdio: "inherit",
      maxBuffer: 1024 * 1024
    });
  } catch (err) {
    console.error(redColor, `Error from execute lint script in ${file}: ${err}`);
    throw err;
  }
}

async function executeStartScript(file: string) {
  console.log(cyanColor, `Execute Start script in ${file}`);
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
          console.error(redColor, `Error from running yarn start: ${error}`);
          return;
        }
        if (stderr) {
          throw stderr;
        }
      }
    );
    serverProcess.stdout.on("data", (data: any) => {
      console.log(data);
      if (data.toString().indexOf("Traceback") > -1) {
        throw new Error("Error found in project");
      }
    });
  } catch (err) {
    console.error(redColor, `Error from execute start script in ${file}: ${err}`);
    throw err;
  }

  console.log("Starting localhost");
  await sleep(60000);
  console.log("Localhost terminated");

  kill(serverProcess.pid);
}

async function executeTestScript(file: string, packageJson: any) {
  console.log(cyanColor, `Execute test script in ${file}`);
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
            console.error(redColor, `Error from running yarn test: ${error}`);
            return;
          }
          if (stderr) {
            throw stderr;
          }
        }
      );
      testProcess.stdout.on("data", (data: any) => {
        console.log(data);
        if (data.toString().indexOf("FAILED") > -1) {
          throw new Error("Error: Test failed");
        }
      });
    } else {
      console.warn(yellowColor, `The test script was not found in ${file}`);
    }
  } catch (err) {
    console.error(redColor, `Error from execute test script in ${file}: ${err}`);
    throw err;
  }

  if(testProcess) {
    await sleep(80000);
    kill(testProcess.pid);
  }
}

function deleteProject() {
  try {
    console.log(cyanColor, "Deleting generated projects");
  del.sync(testFolder, {force: true});
  console.log(cyanColor, "Finished deleting projects");
  if (!fs.existsSync(testFolder)) {
    fs.mkdirSync(testFolder);
  }
  }catch (err) {
    console.error(redColor, `Error from deleting generated projects`);
    throw err;
  }
}

function kill(pid: any) {
  try {
    child_process.execSync(
      "taskkill /PID " + pid + " /T /F",
      (error: any, stdout: any, stderr: any) => {
        console.log(cyanColor, "Stdout from kill: " + stdout);
        console.log(cyanColor, "Stderr from kill:" + stderr);
        if (error !== null) {
          console.error(redColor, "Error from kill: " + error);
        }
      }
    );
  } catch (err) {
    console.error(redColor, `Error from taskkill: ${err}`);
    throw err;
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
