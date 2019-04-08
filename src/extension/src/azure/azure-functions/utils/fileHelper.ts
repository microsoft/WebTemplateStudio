import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import * as appRoot from "app-root-path";
import * as archiver from "archiver";
import { Runtime } from "../functionProvider";
import * as rimraf from "rimraf";
import { CONSTANTS } from "../../../constants";

export namespace FileHelper {
  const FUNCTION_TEMPLATES_RELATIVE_PATH =
    "/src/azure/azure-functions/templates";
  const BASE_NODE_FUNCTION_PATH = "/base/node/index.js";
  const BASE_NODE_FUNCTION_CONFIG_PATH = "/base/node/function.json";
  const APP_NODE_SETTINGS_PATH = "/app/node";

  export function initFunctionDirectory(
    basePath: string,
    appName: string,
    functionNames: string[],
    runtime: Runtime
  ): void {
    let funcAppPath: string = path.join(basePath, appName);
    createFolder(funcAppPath);

    for (let i = 0; i < functionNames.length; i++) {
      switch (runtime) {
        case "node":
          createFolderForNode(path.join(funcAppPath, functionNames[i]));
          break;
        case "dotnet":
          throw new Error(CONSTANTS.ERRORS.RUNTIME_NOT_IMPLEMENTED);
      }
    }

    copySettingsFiles(funcAppPath);
    createTempZip(basePath, appName);
  }

  function copySettingsFiles(funcAppPath: string) {
    let appSettingsPath: string = path.join(
      appRoot.toString(),
      FUNCTION_TEMPLATES_RELATIVE_PATH,
      APP_NODE_SETTINGS_PATH
    );
    fsx.copySync(appSettingsPath, funcAppPath);
  }

  function createFolderForNode(dirPath: string): void {
    createFolder(dirPath);

    let indexPath: string = path.join(
      appRoot.toString(),
      FUNCTION_TEMPLATES_RELATIVE_PATH,
      BASE_NODE_FUNCTION_PATH
    );
    let funcJsonPath: string = path.join(
      appRoot.toString(),
      FUNCTION_TEMPLATES_RELATIVE_PATH,
      BASE_NODE_FUNCTION_CONFIG_PATH
    );

    fs.copyFileSync(indexPath, path.join(dirPath, "index.js"));
    fs.copyFileSync(funcJsonPath, path.join(dirPath, "function.json"));
  }

  function createFolder(dirPath: string): void {
    if (fsx.pathExistsSync(dirPath)) {
      fsx.removeSync(dirPath);
    }

    fsx.mkdirpSync(dirPath);
  }

  function createTempZip(basePath: string, funcAppName: string): void {
    fsx.mkdirpSync(path.join(basePath, "tmp"));

    let zipPath: string = path.join(basePath, "tmp", "out.zip");
    const output = fs.createWriteStream(zipPath);

    var archive = archiver("zip", {
      zlib: { level: 9 } // Sets the compression level.
    });

    output.on("error", function(error: any) {
      throw error;
    });

    archive.on("error", function(error: any) {
      throw error;
    });

    archive.pipe(output);
    archive.directory(path.join(basePath, funcAppName), false);
    archive.finalize();
  }

  export function deleteTempZip(basePath: string): void {
    fsx.removeSync(path.join(basePath, "tmp"));
    rimraf(path.join(basePath, "tmp"), () => {});
  }
}
