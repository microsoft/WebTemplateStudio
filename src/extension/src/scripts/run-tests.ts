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
    cwd: `../../src/template_test/${file}/${file}`
  });
  child_process.execSync("pwd", {
    cwd: `../../src/template_test/${file}/${file}`,
    stdio: "inherit"
  });
  try {
    try {
      checker = child_process.execSync("yarn start &", {
        cwd: `../../src/template_test/${file}/${file}`,
        stdio: "inherit",
        timeout: 10000
      });
    } catch (err) {
      console.log("Error message: " + err.code);
    }
    child_process.execSync("yarn build", {
      cwd: `../../src/template_test/${file}/${file}`,
      stdio: "inherit"
    });
  } catch (err) {
    console.log("========> rip");
    console.log("Error message: " + err);
    throw err;
  }
});

child_process.execSync("rm -r *", {
  cwd: "../../src/template_test/",
  stdio: "inherit"
});
