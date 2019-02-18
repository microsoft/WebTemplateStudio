import * as msrest from 'ms-rest-azure';
import { AzureAuthentication } from './azureAuthentication';
import { FunctionProvider, FunctionSelections } from './functionProvider';
import {ValidationHelper} from './utils';

// the user JSON will be parsed to FunctionSelection
// JSON format:
// {
//      functionAppName: "project-acorn-test",
//      subscriptionId: "31add260-f4a3-497d-8b39-e35101c87f55",
//      location: "WestUS",
//      os: OS.windows,
//      runtime: Runtime.node,
//      resourceGroupId: "GIV_W19_WTS",
//      storageId: "teamwts",
//      functionNames: ["httpTrigger1", "httpTrigger2", "httpTrigger3"]
// }, 
// appPath : "%USERPROFILE%\\source\\repos\\MyWebApplication" (this is just an example)
export function createFunctionApp(selections: FunctionSelections, appPath: string) {

    try {
        ValidationHelper.validate(selections);
    } catch (err) {
        console.log("Validation error: ", err);
        throw err;
    } 

    var credentials: msrest.DeviceTokenCredentials;
    let functionProvider: FunctionProvider;

    AzureAuthentication.getCredentials().then((creds) => {
        credentials = creds;
        functionProvider = new FunctionProvider(selections, credentials, appPath);
        try {
            functionProvider.createFunctionApp();
        } catch (err) {
            console.log("Error deploying application: ", err);
            throw err;
        }
    }).catch((err: Error) => {
        console.log("Error getting credentials: ", err);
        throw err;
    });

}

export function checkFunctionAppName(appName: string) : boolean {
    return true;
}