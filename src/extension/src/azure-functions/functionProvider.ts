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
import { ZipDeployHelper } from "./utils/zipDeployHelper";
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

const FUNCTION_APP_DOMAIN = ".azurewebsites.net";

const MAX_STORAGE_NAME = 24;

/*
 * Returns an array of available/implemented RuntimeObjects for functions app
 */
export function GetAvailableRuntimes(): RuntimeObject[] {
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

    let template = this.getFunctionsARMTemplate();
    let parameters = this.getFunctionsARMParameters(selections);

    let deploymentParams = parameters.parameters;

    try {
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

      /*
       * Azure Resource Client to generate a function app using resource group name, function app name, and options
       */
      await azureResourceClient.deployments
        .createOrUpdate(
          selections.resourceGroupItem.name,
          selections.functionAppName,
          options
        )
        .then(async result => {
          await ZipDeployHelper.zipDeploy(
            selections.subscriptionItem.session.credentials,
            appPath,
            selections.functionAppName
          );

          try {
            FileHelper.deleteTempZip(appPath);
          } catch (error) {
            throw new FileError(error.message);
          }

          return result;
        });
    } catch (error) {
      if (error.constructor === FileError) {
        throw error;
      }
      throw new DeploymentError(error.message);
    }

    this.writeARMTemplatesToApp(appPath, template, parameters);

    /*
     * restarts the app to load new deployment
     */
    await this.webClient!.webApps.restart(
      selections.resourceGroupItem.name,
      selections.functionAppName
    );
  }

  private convertAppNameToStorageName(appName: string): string {
    return appName
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, "")
      .substring(0, MAX_STORAGE_NAME);
  }

  /*
   * gets ARM template for Azure Functions
   */
  private getFunctionsARMTemplate(): any {
    let templatePath = path.join(
      appRoot.toString(),
      "src",
      "azure-functions",
      "arm-templates",
      "template.json"
    );

    return JSON.parse(fs.readFileSync(templatePath, "utf8"));
  }

  /*
   * sets and returns ARM templates parameters with user selections
   */
  private getFunctionsARMParameters(selections: FunctionSelections): any {
    let parametersPath = path.join(
      appRoot.toString(),
      "src",
      "azure-functions",
      "arm-templates",
      "parameters.json"
    );

    let parameters = JSON.parse(fs.readFileSync(parametersPath, "utf8"));

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
        value: this.convertAppNameToStorageName(selections.functionAppName)
      }
    };

    return parameters;
  }

  private writeARMTemplatesToApp(
    appPath: string,
    template: any,
    parameters: any
  ) {
    ARMFileHelper.creatDirIfNonExistent(path.join(appPath, "arm-templates"));
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "functions-template.json"),
      template
    );
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "functions-parameters.json"),
      parameters
    );
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
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_DEFINED);
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
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }

    return await this.webClient
      .checkNameAvailability(appName + FUNCTION_APP_DOMAIN, "Site", {
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
