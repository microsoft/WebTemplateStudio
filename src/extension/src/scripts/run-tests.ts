const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const del = require("del");
import asyncForEach from "../utils/extensions";
const cyanColor = "\x1b[36m%s\x1b[0m";
const redColor = "\x1b[31m%s\x1b[0m";
const yellowColor = "\x1b[33m%s\x1b[0m";

const testFolder = path.join(__dirname, "..", "..", "..", "..", "template_test");
console.log(cyanColor, `Run test scripts from ${testFolder}`);

let files: string[] = [];
fs.readdirSync(testFolder).forEach((file: string) => {
    files.push(file.toString());
});

asyncForEach(files, async (file: string) => {
  console.log(cyanColor, `Current project: ${file}`);

  let packageJsonFile = path.join(testFolder, file, file, "frontend", "package.json");
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
  .catch((err) => {
    process.exitCode = 1;
    throw err;
  });

function installDependencies(projectName: string) {
  try {
    console.log(cyanColor, `Installing dependencies in ${projectName}`);
    installFrontendDependencies(projectName);
    installBackendDependencies(projectName);
  } catch (err) {
    console.error(redColor, `Error from installing dependencies in ${projectName}: ${err}`);
    throw err;
  }
}

function installFrontendDependencies(projectName: string) {
  const frontendPath = path.join(testFolder, projectName, projectName, "frontend");
  executeProcessSync("yarn install", frontendPath);
}

function installBackendDependencies(projectName: string) {
  const backendPath = path.join(testFolder, projectName, projectName, "backend");
  let command = "yarn install";

  if (projectName.indexOf("Flask") > -1) {
    command = "pip install -r ./requirements.txt";
  }
  if (projectName.indexOf("AspNet") > -1) {
    command = "dotnet restore";
  }
  executeProcessSync(command, backendPath);
}

function executeLintScript(projectName: string) {
  try {
    console.log(cyanColor, `Execute lint script in ${projectName}`);
    const frontendPath = path.join(testFolder, projectName, projectName, "frontend");
    executeProcessSync("yarn lint --no-fix", frontendPath);
  } catch (err) {
    console.error(redColor, `Error from execute lint script in ${projectName}: ${err}`);
    throw err;
  }
}

async function executeStartScript(projectName: string) {
  console.log(cyanColor, `Execute Start script in ${projectName}`);
  let frontendProcess;
  let backendProcess;
  try {
    frontendProcess = startFrontend(projectName);
    backendProcess = startBackend(projectName);
  } catch (err) {
    console.error(redColor, `Error from execute start script in ${projectName}: ${err}`);
    throw err;
  }

  console.log("Starting localhost");
  await sleep(60000);
  console.log("Localhost terminated");

  kill(frontendProcess.pid);
  kill(backendProcess.pid);
}

function startFrontend(projectName: string) {
  const frontendPath = path.join(testFolder, projectName, projectName, "frontend");
  const process = executeProcess("yarn start", frontendPath, "Error from running frontend");

  process.stdout.on("data", (data: any) => {
    console.log(data);
    if (data.toString().indexOf("Traceback") > -1) {
      throw new Error(`Error found in project when executing ${projectName} frontend`);
    }
  });

  return process;
}

function startBackend(projectName: string) {
  const backendPath = path.join(testFolder, projectName, projectName, "backend");
  let command = "yarn start";

  if (projectName.indexOf("Flask") > -1) {
    command = "python ./server.py";
  }
  if (projectName.indexOf("AspNet") > -1) {
    command = "dotnet run";
  }
  const process = executeProcess(command, backendPath, "Error from running backend");

  process.stdout.on("data", (data: any) => {
    console.log(data);
    if (data.toString().indexOf("Traceback") > -1) {
      throw new Error(`Error found in project when executing ${projectName} backend`);
    }
  });

  return process;
}

async function executeTestScript(projectName: string, packageJson: any) {
  console.log(cyanColor, `Execute test script in ${projectName}`);
  let testProcess;
  try {
    if (packageJson.scripts.test) {
      const frontendPath = path.join(testFolder, projectName, projectName, "frontend");
      testProcess = executeProcess("yarn test", frontendPath, "Error from running yarn test");

      testProcess.stdout.on("data", (data: any) => {
        console.log(data);
        if (data.toString().indexOf("FAILED") > -1) {
          throw new Error("Error: Test failed");
        }
      });
    } else {
      console.warn(yellowColor, `The test script was not found in ${projectName}`);
    }
  } catch (err) {
    console.error(redColor, `Error from execute test script in ${projectName}: ${err}`);
    throw err;
  }

  if (testProcess) {
    await sleep(80000);
    kill(testProcess.pid);
  }
}

function deleteProject() {
  try {
    console.log(cyanColor, "Deleting generated projects");
    del.sync(testFolder, { force: true });
    console.log(cyanColor, "Finished deleting projects");
    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder);
    }
  } catch (err) {
    console.error(redColor, `Error from deleting generated projects`);
    throw err;
  }
}

function kill(pid: any) {
  try {
    child_process.execSync("taskkill /PID " + pid + " /T /F", (error: any, stdout: any, stderr: any) => {
      console.log(cyanColor, "Stdout from kill: " + stdout);
      console.log(cyanColor, "Stderr from kill:" + stderr);
      if (error !== null) {
        console.error(redColor, "Error from kill: " + error);
      }
    });
  } catch (err) {
    console.error(redColor, `Error from taskkill: ${err}`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function executeProcessSync(command: string, path: string) {
  child_process.execSync(command, {
    cwd: path,
    stdio: "inherit",
    maxBuffer: 1024 * 1024,
  });
}

function executeProcess(command: string, path: string, errorMessage: string) {
  return child_process.exec(
    command,
    {
      cwd: path,
      stdio: "inherit",
      maxBuffer: 1024 * 1024,
    },
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(redColor, `${errorMessage}: ${error}`);
        return;
      }
      if (stderr) {
        throw stderr;
      }
    }
  );
}
