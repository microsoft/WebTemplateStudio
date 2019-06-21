let child_process = require("child_process");
let test_log = child_process
  .execSync("ls", { cwd: "../../src/template_test" })
  .toString();
let files = test_log.split("\n");
files.pop();
console.log(files);
let checker: { pid: any };

function killport(port: number) {
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
}
files.forEach((file: any) => {
  child_process.execSync("yarn install", {
    cwd: `../../src/template_test/${file}/${file}`
  });
  try {
    try {
      checker = child_process.execSync("yarn start &", {
        cwd: `../../src/template_test/${file}/${file}`,
        stdio: "inherit",
        timeout: 10000
      });
    } catch (err) {
      if (err.code == "ETIMEDOUT") {
        killport(3000);
        killport(3001);
        console.log("bobobo");
        console.log("Error message: " + err.code);
      } else {
        throw err;
      }
    }
    child_process.execSync("yarn build", {
      cwd: `../../src/template_test/${file}/${file}`,
      stdio: "inherit"
    });
  } catch (err) {
    console.log("Error: " + err);
    throw err;
  }
});

child_process.execSync("rm -r *", {
  cwd: "../../src/template_test/",
  stdio: "inherit"
});
