var child_process = require("child_process");
var test_log = child_process
  .execSync("ls", { cwd: "../../src/template_test" })
  .toString();
var files = test_log.split("\n");
files.pop();
console.log(files);
console.log(test_log);
var checker;

files.forEach((file: string) => {
  child_process.execSync("yarn install", {
    cwd: `../../src/template_test/${file}`
  });
  child_process.execSync("pwd", {
    cwd: `../../src/template_test/${file}`,
    stdio: "inherit"
  });
  try {
    let { stdout, stderr } = child_process.exec("yarn start &", {
      cwd: `../../src/template_test/${file}`,
      timeout: 2000,
      stdio: "inherit"
    });
    console.log(stdout);
    //wait x sec
    if (stderr) {
      throw stderr;
    }
    console.log("===========> exited yay");
    child_process.exit();

    //child_process.execSync("yarn build", {
    //  cwd: `../../src/template_test/${file}`,
    //  stdio: "inherit"
    //});
  } catch (err) {
    console.log("========> rip");
    console.log("Error message: " + err.message);
    throw err;
  }
});
