import * as fsx from "fs-extra";

export namespace ARMFileHelper {
  export function createDirIfNonExistent(dirPath: string): void {
    if (!fsx.pathExistsSync(dirPath)) {
      fsx.mkdirpSync(dirPath);
    }
  }

  export function writeObjectToJsonFile(
    filePath: string,
    object: object
  ): void {
    fsx.writeFileSync(filePath, JSON.stringify(object, null, 2), "utf-8");
  }
}
