import { ValidationHelper, FileHelper } from "./utils";
import { ServiceClientCredentials } from "ms-rest";
import { WebSiteManagementClient } from "azure-arm-website";
import {
  FileError,
  DeploymentError,
  AuthorizationError,
  ConnectionError,
  SubscriptionError,
  ValidationError
} from "../errors";
import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import { config } from "./config";
import { ZipDeploy } from "./utils/zipDeployHelper";
import * as fs from "fs";
import * as path from "path";
import {
  ResourceManagementClient,
  ResourceManagementModels
} from "azure-arm-resource/lib/resource/resourceManagementClient";
import { ResourceManager } from "../azure-arm/resourceManager";
import * as appRoot from "app-root-path";
import { ARMFileHelper } from "../azure-arm/armFileHelper";
import { CONSTANTS } from "../constants";

/*
 * Runtime for the deployment, can be either 'dotnet' or 'node'.
 */
export type Runtime = "dotnet" | "node";

/*
 * Implemented runtime selections
 * value: the runtime which should be returned as selection
 * label: String to display to user
 */
export interface RuntimeObject {
  value: Runtime;
  label: string;
}

/*
 * Returns an array of available/implemented RuntimeObjects for functions app
 */
export function GetAvailableRuntimes(): Array<RuntimeObject> {
  return [
    {
      value: "node",
      label: "Node.JS"
    }
  ];
}

/*
 * User selections from the wizard
 *
 * functionAppName: Globally unique app name for your function. Use checkFunctionAppName to validate
 * subscriptionItem: Subscription Item for user's selected subscription
 * resourceGroupItem ResourceGroupItem for user's selected resource group
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
 * resourceGroupItem: {location: , name: resourceGroup: },
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

export class FunctionProvider {
  private webClient: WebSiteManagementClient | undefined;

  /*
   * Create and deploy a function app from the given user selections.
   * Validates the user selections
   * Throws ValidationError if user input is invalid.
   * Throws AuthorizationError if authorization fails.
   * Throws DeploymentError if deployment fails.
   *
   * @param selections The user selection object (FunctionSelections)
   *
   * @param appPath The path to original app being created by Web Template Studio
   *   The function app folder would be added under this
   *
   * @returns Promise<void> Throws a void promise, catch errors as required
   */
  public async createFunctionApp(
    selections: FunctionSelections,
    appPath: string
  ): Promise<void> {
    ValidationHelper.validate(selections); // throws validation error on failure

    let isUnique = await this.checkFunctionAppName(
      selections.functionAppName,
      selections.subscriptionItem
    );
    if (!isUnique) {
      throw new ValidationError(
        CONSTANTS.ERRORS.FUNCTION_APP_NAME_NOT_AVAILABLE(
          selections.functionAppName
        )
      );
    }

    try {
      this.setWebClient(selections.subscriptionItem);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }

    try {
      FileHelper.initFunctionDirectory(
        appPath,
        selections.functionAppName,
        selections.functionNames,
        selections.runtime
      );
    } catch (error) {
      throw new FileError(error.message);
    }

    try {
      let template = JSON.parse(
        fs.readFileSync(
          path.join(
            appRoot.toString(),
            "src",
            "azure-functions",
            "arm-templates",
            "template.json"
          ),
          "utf8"
        )
      );

      let parameters = JSON.parse(
        fs.readFileSync(
          path.join(
            appRoot.toString(),
            "src",
            "azure-functions",
            "arm-templates",
            "parameters.json"
          ),
          "utf8"
        )
      );

      parameters.parameters = {
        name: {
          value: selections.functionAppName
        },
        location: {
          value: selections.location
        },
        runtime: {
          value: selections.runtime
        },
        subscriptionId: {
          value: selections.subscriptionItem.subscriptionId
        },
        storageName: {
          value:
            selections.functionAppName
              .toLowerCase()
              .replace(/[^0-9a-z]/gi, "") + config.storageNameSuffix
        }
      };

      let deploymentParams = parameters.parameters;

      var options: ResourceManagementModels.Deployment = {
        properties: {
          mode: "Incremental",
          parameters: deploymentParams,
          template: template
        }
      };

      let azureResourceClient: ResourceManagementClient = new ResourceManager().getResourceManagementClient(
        selections.subscriptionItem
      );

      ARMFileHelper.creatDirIfNotExists(path.join(appPath, "arm-templates"));
      ARMFileHelper.writeObjectToJsonFile(
        path.join(appPath, "arm-templates", "functions-template.json"),
        template
      );
      ARMFileHelper.writeObjectToJsonFile(
        path.join(appPath, "arm-templates", "functions-parameters.json"),
        parameters
      );

      /*
       * Cosmos Client to generate a cosmos DB resource using resource group name, database name, and options *
       */
      await azureResourceClient.deployments
        .createOrUpdate(
          selections.resourceGroupItem.name,
          selections.functionAppName,
          options
        )
        .then(result => {
          setTimeout(async () => {
            await ZipDeploy.zipDeploy(
              selections.subscriptionItem.session.credentials,
              appPath,
              selections.functionAppName
            );

            try {
              FileHelper.deleteTempZip(appPath);
            } catch (error) {
              throw new FileError(error.message);
            }

            return Promise.resolve(result);
          }, 10000);
        });
    } catch (error) {
      if (error.constructor === FileError) {
        throw error;
      }
      throw new DeploymentError(error.message);
    }
  }

  /*
   * Sets a web client from a users selected subscription item's credentials
   */
  private setWebClient(userSubscriptionItem: SubscriptionItem): void {
    if (
      this.webClient === undefined ||
      this.webClient.subscriptionId !== userSubscriptionItem.subscriptionId
    ) {
      this.webClient = this.createWebClient(userSubscriptionItem);
    }
  }

  private createWebClient(
    userSubscriptionItem: SubscriptionItem
  ): WebSiteManagementClient {
    let credentials: ServiceClientCredentials =
      userSubscriptionItem.session.credentials;

    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_UNDEFINED);
    }

    return new WebSiteManagementClient(
      credentials,
      userSubscriptionItem.subscriptionId
    );
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
  public async checkFunctionAppName(
    appName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<boolean | undefined> {
    try {
      this.setWebClient(subscriptionItem);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }

    ValidationHelper.validateFunctionAppName(appName);

    if (this.webClient === undefined) {
      throw new AuthorizationError(
        CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_UNDEFINED
      );
    }

    return await this.webClient
      .checkNameAvailability(appName + config.functionAppDomain, "Site", {
        isFqdn: true
      })
      .then(res => {
        return res.nameAvailable;
      })
      .catch(error => {
        throw new ConnectionError(error.message);
      });
  }
}
