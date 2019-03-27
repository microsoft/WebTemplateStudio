import { ServiceClientCredentials } from "ms-rest";
import * as path from "path";
import * as fs from "fs";
import * as request from "request";
import { CONSTANTS } from "../../constants";

export namespace ZipDeployHelper {
  export async function zipDeploy(
    credentials: ServiceClientCredentials,
    appPath: string,
    appName: string
  ): Promise<void> {
    const zipPath = path.join(appPath, "tmp", "out.zip");

    const zipRequestUrl = `https://${appName.toLowerCase()}${
      CONSTANTS.FUNCTIONS_CONFIG.FUNCTION_ZIP_PATH
    }`;

    let tokenCache = await (<any>credentials).tokenCache;

    const options = {
      url: zipRequestUrl,
      headers: {
        Authorization: "Bearer " + tokenCache.target._entries[0].accessToken,
        Accept: "*/*"
      }
    };

    await fs.createReadStream(zipPath).pipe(
      request.post(options, (uploadZipError: any, uploadZipResponse: any) => {
        if (uploadZipError) {
          return Promise.reject(uploadZipError);
        } else {
          return Promise.resolve(uploadZipResponse);
        }
      })
    );
  }
}
