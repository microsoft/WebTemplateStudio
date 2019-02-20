import { ValidationHelper, FileHelper } from './utils';
import { AzureAuth } from '../azure-auth/azureAuth';
import { ServiceClientCredentials } from 'ms-rest';
import * as WebsiteManagement from 'azure-arm-website';
import { FileError, DeploymentError, AuthorizationError } from '../errors';

/*
* User selections from the wizard
* Cast the user selection JSON object returned by the wizard to the interface as:
*   var selections: FunctionSelections = <FunctionSelections>userSelections;
* 
* functionAppName: Globally unique app name for your function. Use checkFunctionAppName to validate
* subscriptionId: Subscription Id for users selected subscription
* resourceGroupName: Name for the resource group under the subscription selected by use.
*   If user creates a new subscription, send that resource group name in selections after resource group is created.
* location: Location for deployment, can be West US/East US/China North/East Asia etc.
*   The location is in same format as found on Azure portal
* runtime: Runtime for the deployment, can be either 'dotnet' or 'node'. Throws validation error otherwise.
*   Note: 'dotnet' isn't supported yet!
* functionNames: Names of all the functions created by user, can only include alphanumeric characters and dashes.
*   No duplicates allowed!
*
*
* JSON format:
* {
* functionAppName: "YOUR_FUNCTION_APP_NAME",
* subscriptionId: "YOUR_SUBSCRIPTION_ID",
* location: "West US",
* runtime: "node",
* resourceGroupName: "YOUR_RESOURCE_GROUP",
* functionNames: ["function1", "function2", "function3"]
* }, 
*/
export interface FunctionSelections {
    functionAppName:    string;
    subscriptionId:     string;
    resourceGroupName:  string;
    location:           string; 
    runtime:            string;
    functionNames:      string[];
}

export namespace FunctionProvider {
    /*
    * Create and deploy a function app from the given user selections.
    * Validates the user selections
    * Throws ValidationError if user input is invalid. 
    * Throws AuthoriaztionError if authorization fails.
    * Throws DeploymentError if deployment fails.
    *
    * @param selections The user selection JSON casted to FunctionSelections interface
    *
    * @param appPath The path to original app being created by Web Template Studio
    *   The function app folder would be added under tis
    *
    * @returns Promise<void> Throws a void promise, catch errors as required
    */
    export async function createFunctionApp(selections: FunctionSelections, appPath: string): Promise<void> {

        selections.runtime = selections.runtime.toLowerCase();

        ValidationHelper.validate(selections); // throws validation error on failure

        try {
            let credentials: ServiceClientCredentials = AzureAuth.getCredentials();

            var webClient = new WebsiteManagement.WebSiteManagementClient(credentials, selections.subscriptionId);
        } catch (err) {
            throw new AuthorizationError(err.message);
        }
        

        try {
            FileHelper.initFunctionDirectory(appPath, selections.functionAppName, selections.functionNames, selections.runtime);
        } catch (err) {
            throw new FileError(err.message);
        }

        try {
            await webClient.webApps.createOrUpdate(selections.resourceGroupName, selections.functionAppName, {
                location: selections.location,
                kind: "functionapp",
                siteConfig: {
                    http20Enabled: true,
                }
            });
            
            await webClient.webApps.updateApplicationSettings(selections.resourceGroupName, selections.functionAppName, {
                kind: "functionapp",
                properties: {
                    "FUNCTIONS_EXTENSION_VERSION": "~2",
                    "FUNCTIONS_WORKER_RUNTIME": selections.runtime,
                    "WEBSITE_RUN_FROM_PACKAGE": "1"
                }
            });
        } catch (err) {
            throw new DeploymentError(err.message);
        }

    }

    /*
    * Check if a function app name is available
    *
    * @param appName function app name to check uniqueness/availability for
    *
    * @returns Promise<boolean> True if the app name is available, false if it isn't
    *   catch errors as required
    */
    export async function checkFunctionAppName(appName: string) : Promise<boolean> {
        // TODO
        return true;
    }
}

