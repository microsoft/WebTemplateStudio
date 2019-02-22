import { ServiceClientCredentials } from 'ms-rest';
import { config } from '../config';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';

export namespace ZipDeploy {

    export async function zipDeploy(credentials: ServiceClientCredentials, appPath: string, appName: string): Promise<void> {

        const zipPath = path.join(appPath, appName, 'out.zip');

        const zipRequestUrl = `https://${appName.toLowerCase()}${config.functionZipPath}`;

        let tokenCache = await (<any>credentials).tokenCache;

        const options = {
            url: zipRequestUrl,
            headers: {
                Authorization: 'Bearer ' + tokenCache.target._entries[0].accessToken,
                Accept: '*/*'
            }
        };

        fs.createReadStream(zipPath)
            .pipe(request.post(options, (uploadZipErr: any, uploadZipResponse: any) => {
                if (uploadZipErr) {
                    return Promise.reject(uploadZipErr);
                } else {
                    return Promise.resolve(uploadZipResponse);
                }
            }
            ));
    }
}