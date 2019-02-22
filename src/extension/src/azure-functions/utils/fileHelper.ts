import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as path from 'path';
import { config } from '../config';
import * as appRoot from 'app-root-path';
import * as archiver from 'archiver';
import { Runtime } from '../functionProvider';

export namespace FileHelper {

    export function initFunctionDirectory(basePath: string, appName: string, functionNames: string[], runtime: Runtime): void {
        let funcAppPath: string = path.join(basePath, appName);
        mkdir(funcAppPath);

        for (let i = 0; i < functionNames.length; i++) {
            switch (runtime) {
                case "node":
                    mkdirForNode(path.join(funcAppPath, functionNames[i]));
                    break;
                case "dotnet":
                    throw new Error("Runtime not implement yet");
            }
        }

        copySettingsFiles(funcAppPath);
        createTempZip(funcAppPath);
    }

    function copySettingsFiles(funcAppPath: string) {
        let appSettingsPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.appNodeSettingsPath);
        fsx.copySync(appSettingsPath, funcAppPath);
    }

    function mkdirForNode(dirPath: string): void {
        mkdir(dirPath);

        let indexPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.baseNodeFunctionPath);
        let funcJsonPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.baseNodeFunctionConfigPath);

        fs.copyFileSync(indexPath, path.join(dirPath, 'index.js'));
        fs.copyFileSync(funcJsonPath, path.join(dirPath, 'function.json'));
    }

    function mkdir(dirPath: string): void {
        if (fsx.pathExistsSync(dirPath)) {
            fsx.removeSync(dirPath);
        }

        fsx.mkdirpSync(dirPath);
    }

    function createTempZip(funcAppPath: string): void {

        let zipPath: string = path.join(funcAppPath, 'out.zip');
        const output = fs.createWriteStream(zipPath);

        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        output.on('error', function (err: any) {
            throw err;
        });

        archive.on('error', function (err: any) {
            throw err;
        });

        archive.pipe(output);
        archive.directory(path.join(funcAppPath), false);
        archive.finalize();
    }
}