import * as fsx from "fs-extra";

export namespace ARMFileHelper {
  export function createOrOverwriteDir(dirPath: string): void {
    if (fsx.pathExistsSync(dirPath)) {
      fsx.removeSync(dirPath);
    }

    fsx.mkdirpSync(dirPath);
  }

  export function writeObjectToJsonFile(
    filePath: string,
    object: object
  ): void {
    fsx.writeFileSync(filePath, JSON.stringify(object, null, 2), "utf-8");
  }
}
