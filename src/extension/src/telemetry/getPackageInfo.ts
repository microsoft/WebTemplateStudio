import * as vscode from 'vscode';
import * as fse from 'fs-extra';

export interface IPackageJson {
    version?: string;
    name?: string;
    publisher?: string;
    aiKey?: string;
    bugs?: string | {
    url?: string;
    };
}

export function getPackageInfo(ctx?: vscode.ExtensionContext): { extensionName: string, extensionVersion: string, aiKey: string, extensionId: string, bugsUrl: string | undefined } {
        
    let packageJson: IPackageJson;
    try {
        if (ctx) {
            // tslint:disable-next-line:non-literal-require
            packageJson = <IPackageJson>fse.readJsonSync(ctx.asAbsolutePath('package.json'));
        } else {
            throw new Error('No extension context');
        }
    } catch (error) {
        console.error(`getPackageInfo: ${(error).message}`);
        throw error;
    }
    const extensionName: string | undefined = packageJson.name;
    const extensionVersion: string | undefined = packageJson.version;
    const aiKey: string | undefined = packageJson.aiKey;
    const publisher: string | undefined = packageJson.publisher;
    const bugsUrl: string | undefined = !packageJson.bugs ? undefined :
        typeof packageJson.bugs === 'string' ? packageJson.bugs :
        packageJson.bugs.url;

    if (!aiKey) {
        throw new Error('Extension\'s package.json is missing aiKey');
    }
    if (!extensionName) {
        throw new Error('Extension\'s package.json is missing name');
    }
    if (!publisher) {
        throw new Error('Extension\'s package.json is missing publisher');
    }
    if (!extensionVersion) {
        throw new Error('Extension\'s package.json is missing version');
    }

    const extensionId: string = `${packageJson.publisher}.${packageJson.name}`;

    return { extensionName, extensionVersion, aiKey, extensionId, bugsUrl };
}

