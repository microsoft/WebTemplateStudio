import { ServiceClientCredentials } from "ms-rest";
import * as path from "path";
import * as fs from "fs";
import * as request from "request";

export namespace ZipDeployHelper {
  const FUNCTION_ZIP_DEPLOY_DOMAIN = ".scm.azurewebsites.net/api/zipdeploy";

  export async function zipDeploy(
    credentials: ServiceClientCredentials,
    appPath: string,
    appName: string
  ): Promise<void> {
    const zipPath = path.join(appPath, "tmp", "out.zip");

    const zipRequestUrl = `https://${appName.toLowerCase()}${FUNCTION_ZIP_DEPLOY_DOMAIN}`;

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
          throw uploadZipError;
        } else {
          return uploadZipResponse;
        }
      })
    );
  }
}
