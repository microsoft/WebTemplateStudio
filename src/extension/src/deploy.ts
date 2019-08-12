import * as childProcess from "child_process";

export class Deploy {
  public static installDependencies() {
    console.log(childProcess.execSync("pwd"));
    // return childProcess.exec("npm install");
  }

  public static buildProject() {
    // return childProcess.exec("npm build");
  }
}
