import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as path from 'path';
import {config} from '../config';
import * as appRoot from 'app-root-path';
import * as archiver from 'archiver';

export abstract class FileHelper {

    public static initFunctionDirectory(basePath: string, appName: string, functionNames: string[]): void {
        let funcAppPath: string = path.join(basePath, appName);
        FileHelper.mkdir(funcAppPath);

        for (let i = 0; i < functionNames.length; i++) {
            FileHelper.mkdirForNode(path.join(funcAppPath, functionNames[i]));
        }

        FileHelper.copySettingsFiles(funcAppPath);
        FileHelper.createTempZip(funcAppPath);
    }

    private static copySettingsFiles(funcAppPath: string) {
        let appSettingsPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.appNodeSettingsPath);
        fsx.copySync(appSettingsPath, funcAppPath);
    }

    private static mkdirForNode(dirPath: string): void {
        FileHelper.mkdir(dirPath);

        let indexPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.baseNodeFunctionPath);
        let funcJsonPath: string = path.join(appRoot.toString(), config.functionTemplatesRelativePath, config.baseNodeFunctionConfigPath);

        fs.copyFileSync(indexPath, path.join(dirPath, 'index.js'));
        fs.copyFileSync(funcJsonPath, path.join(dirPath, 'function.json'));
    }

    private static mkdir(dirPath: string): void {
        if (fsx.pathExistsSync(dirPath)) {
            fsx.removeSync(dirPath);            
        }

        fsx.mkdirpSync(dirPath);
    }

    private static createTempZip(funcAppPath: string): void {
        fsx.mkdirpSync(path.join(funcAppPath, 'tmp'));
        
        let zipPath: string = path.join(funcAppPath, 'tmp/out.zip');
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
        archive.directory(funcAppPath, false);
        archive.finalize();
    }

    public static deleteTempZip(basePath: string, appName: string): void {
        fsx.removeSync(path.join(basePath, appName, 'tmp'));
    }
}