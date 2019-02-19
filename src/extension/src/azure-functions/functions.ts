import { FunctionProvider, FunctionSelections } from './functionProvider';
import { ValidationHelper } from './utils';
import { AzureAuth } from '../azure-auth/AzureAuth';
import { ServiceClientCredentials } from 'ms-rest';

// the user JSON will be parsed to FunctionSelection
// JSON format:
// {
//      functionAppName: "project-acorn-test",
//      subscriptionId: "YOUR_SUBSCRIPTION_ID",
//      location: "West US",
//      runtime: Runtime.node,
//      resourceGroupName: "GIV_W19_WTS",
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

    try {
        var azureAuth: AzureAuth = new AzureAuth();
    } catch (err) {
        console.log("Error initializing auth object: ", err);
        throw err;
    }

    let functionProvider: FunctionProvider;

    try {
        var credentials: ServiceClientCredentials = azureAuth.getCredentials();
    } catch (err) {
        console.log("User credentials not found: ", err);
        throw err;
    }

    functionProvider = new FunctionProvider(selections, credentials, appPath);
    try {
        functionProvider.createFunctionApp();
    } catch (err) {
        console.log("Error deploying application: ", err);
        throw err;
    }

}

export function checkFunctionAppName(appName: string) : boolean {
    // TODO
    return true;
}