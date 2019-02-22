import { ValidationHelper, FileHelper } from './utils';
import { ServiceClientCredentials } from 'ms-rest';
import * as WebsiteManagement from 'azure-arm-website';
import { FileError, DeploymentError, AuthorizationError, ConnectionError } from '../errors';
import { SubscriptionItem, ResourceGroupItem } from '../azure-auth/AzureAuth';
import { config } from './config';
import { ZipDeploy } from './utils/zipDeployHelper';


/*
* Runtime for the deployment, can be either 'dotnet' or 'node'.
*/
export type Runtime = "dotnet" | "node";

/*
* User selections from the wizard
* 
* functionAppName: Globally unique app name for your function. Use checkFunctionAppName to validate
* subscriptionItem: Subscription Item for user's selected subscription
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
* Format:
* {
* functionAppName: "YOUR_FUNCTION_APP_NAME",
* subscriptionItem: {label: , subscriptionId: , session: , subscription: },
* location: "West US",
* runtime: "node",
* resourceGroupItem: {name:, location: , resourceGroup: },
* functionNames: ["function1", "function2", "function3"]
* }, 
*/
export interface FunctionSelections {
    functionAppName: string;
    subscriptionItem: SubscriptionItem;
    resourceGroupItem: ResourceGroupItem;
    location: string;
    runtime: Runtime;
    functionNames: string[];
}

export namespace FunctionProvider {
    /*
    * Create and deploy a function app from the given user selections.
    * Validates the user selections
    * Throws ValidationError if user input is invalid. 
    * Throws AuthoriaztionError if authorization fails.
    * Throws DeploymentError if deployment fails.
    *
    * @param selections The user selection object (FunctionSelections)
    *
    * @param appPath The path to original app being created by Web Template Studio
    *   The function app folder would be added under tis
    *
    * @returns Promise<void> Throws a void promise, catch errors as required
    */
    export async function createFunctionApp(selections: FunctionSelections, appPath: string): Promise<void> {

        ValidationHelper.validate(selections); // throws validation error on failure

        try {
            let credentials: ServiceClientCredentials = selections.subscriptionItem.session.credentials;

            var webClient = new WebsiteManagement.WebSiteManagementClient(credentials, selections.subscriptionItem.subscriptionId);
        } catch (err) {
            throw new AuthorizationError(err.message);
        }


        try {
            FileHelper.initFunctionDirectory(appPath, selections.functionAppName, selections.functionNames, selections.runtime);
        } catch (err) {
            throw new FileError(err.message);
        }

        try {
            await webClient.webApps.createOrUpdate(selections.resourceGroupItem.name, selections.functionAppName, {
                location: selections.location,
                kind: "functionapp",
                siteConfig: {
                    http20Enabled: true,
                }
            });

            await webClient.webApps.updateApplicationSettings(selections.resourceGroupItem.name, selections.functionAppName, {
                kind: "functionapp",
                properties: {
                    "FUNCTIONS_EXTENSION_VERSION": "~2",
                    "FUNCTIONS_WORKER_RUNTIME": selections.runtime,
                    "WEBSITE_RUN_FROM_PACKAGE": "1",
                    "WEBSITE_NODE_DEFAULT_VERSION": "8.11.1",
                }
            });

            await ZipDeploy.zipDeploy(selections.subscriptionItem.session.credentials, appPath, selections.functionAppName);

        } catch (err) {
            throw new DeploymentError(err.message);
        }

    }

    /*
    * Check if a function app name is available
    *
    * @param appName function app name to check uniqueness/availability for
    * 
    * @param subscriptionItem Subscription Item for user's selected subscription/random subscription for user
    *
    * @returns Promise<boolean> True if the app name is available, false if it isn't
    *   catch errors as required
    */
    export async function checkFunctionAppName(appName: string, subscriptionItem: SubscriptionItem): Promise<boolean | undefined> {
        try {
            let credentials: ServiceClientCredentials = subscriptionItem.session.credentials;

            var webClient = new WebsiteManagement.WebSiteManagementClient(credentials, subscriptionItem.subscriptionId);
        } catch (err) {
            throw new AuthorizationError(err.message);
        }

        ValidationHelper.validateFunctionAppName(appName);

        return await webClient.checkNameAvailability(appName + config.functionAppDomain, "Site", { isFqdn: true })
            .then((res) => {
                return res.nameAvailable;
            })
            .catch((err) => {
                throw new ConnectionError(err.message);
            });
    }
}

