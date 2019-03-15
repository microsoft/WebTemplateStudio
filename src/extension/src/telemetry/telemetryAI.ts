import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import * as fse from 'fs-extra';

export type TelemetryReporter = TelemetryReporter;

export class TelemetryAIProvider {


    public static createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = this.getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        //adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }

    private static getPackageInfo(ctx?: vscode.ExtensionContext): { extensionName: string, extensionVersion: string, aiKey: string, extensionId: string, bugsUrl: string | undefined } {
        
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
}

interface IPackageJson {
    version?: string;
    name?: string;
    publisher?: string;
    aiKey?: string;
    bugs?: string | {
        url?: string;
    };
}