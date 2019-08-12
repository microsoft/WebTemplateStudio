import * as vscode from "vscode";
import { Controller } from "./controller";
// import { Deploy } from "./deploy";
import * as childProcess from "child_process";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        Controller.getInstance(context, Date.now());
      }
    ),
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.deployApp",
      async () => {
        const folder = vscode.workspace.workspaceFolders
          ? vscode.workspace.workspaceFolders[0]
          : undefined;
        const folderPath = folder ? folder.uri.fsPath : undefined;
        console.log(folderPath);
        // const { stdout, stderr } = await exec("echo %cd%", {
        //   cwd: folderPath
        // });
        // console.log(stdout);
        // console.log(stderr);
        // await exec(`cd ${folderPath}`);
        // const { stdout, stderr } = await exec(
        //   `npm install --prefix ${folderPath}`
        // );
        // console.log("here");
        // console.log(stdout);
        // console.log(stderr);
        const { stdout, stderr } = await childProcess.spawn(
          "npm",
          ["install"],
          { cwd: folderPath }
        );
        console.log("here");
        console.log(stdout);
        console.log(stderr);
        await exec("npm build", { cwd: folderPath });

        // Deploy.installDependencies().then(() => Deploy.buildProject());
        // Deploy.installDependencies();
      }
    )
  );
}

export function deactivate() {
  Controller.dispose();
}
