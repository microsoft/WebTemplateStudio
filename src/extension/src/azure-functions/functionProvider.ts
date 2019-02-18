import * as msrest from 'ms-rest-azure';
import * as WebsiteManagement from 'azure-arm-website';
import { FileHelper } from './utils';

export enum Runtime {
    dotnet = "dotnet",
    node = "node"
}

export interface FunctionSelections {
    functionAppName:    string; // unique
    subscriptionId:     string;
    resourceGroupName:  string;
    location:           string; // West US/East US/China North/East Asia etc..
    runtime:            Runtime;
    storageId:          string;
    functionNames:      string[]; // function names can only include dashes and alphanumeric characters
}

export class FunctionProvider {
    
    private selections:     FunctionSelections;
    private credentials:    msrest.DeviceTokenCredentials;
    private appPath:        string; // path to the generated application, functions app folder would be under this

    constructor(selections: FunctionSelections, credentials: msrest.DeviceTokenCredentials, appPath: string) {
        this.appPath = appPath;
        this.selections = selections;
        this.credentials = credentials;
    }

    public async createFunctionApp(): Promise<void> {
        const webClient = new WebsiteManagement.WebSiteManagementClient(this.credentials, this.selections.subscriptionId);

        try {
            FileHelper.initFunctionDirectory(this.appPath, this.selections.functionAppName, this.selections.functionNames);
        } catch (err) {
            return Promise.reject(err);
        }

        try {
            await webClient.webApps.createOrUpdate(this.selections.resourceGroupName, this.selections.functionAppName, {
                location: this.selections.location,
                kind: "functionapp",
                siteConfig: {
                    http20Enabled: true,
                }
            });
            
            await webClient.webApps.updateApplicationSettings(this.selections.resourceGroupName, this.selections.functionAppName, {
                kind: "functionapp",
                properties: {
                    "FUNCTIONS_EXTENSION_VERSION": "~2",
                    "FUNCTIONS_WORKER_RUNTIME": this.selections.runtime,
                    "WEBSITE_RUN_FROM_PACKAGE": "1"
                }
            });
        } catch (err) {
            return Promise.reject(err);
        }
        
        // call zip deployment here

        // call delete zip here
    }
}