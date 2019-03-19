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

/*
 * Runtime for the deployment, can be either 'dotnet' or 'node'.
 */
export type Runtime = "dotnet" | "node";

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
  private webClient: WebSiteManagementClient | undefined = undefined;

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
        `Function app name: ${selections.functionAppName} is not available.`
      );
    }

    try {
      this.setClientState(selections.subscriptionItem);
    } catch (err) {
      throw new AuthorizationError(err.message);
    }

    try {
      FileHelper.initFunctionDirectory(
        appPath,
        selections.functionAppName,
        selections.functionNames,
        selections.runtime
      );
    } catch (err) {
      throw new FileError(err.message);
    }

    try {
      if (this.webClient === undefined) {
        throw new AuthorizationError(
          "Website management client cannot be undefined."
        );
      }

      await this.webClient.webApps.createOrUpdate(
        selections.resourceGroupItem.name,
        selections.functionAppName,
        {
          location: selections.location,
          kind: "functionapp",
          siteConfig: {
            http20Enabled: true
          }
        }
      );

      this.webClient.webApps
        .updateApplicationSettings(
          selections.resourceGroupItem.name,
          selections.functionAppName,
          {
            kind: "functionapp",
            properties: {
              FUNCTIONS_EXTENSION_VERSION: "~2",
              FUNCTIONS_WORKER_RUNTIME: selections.runtime,
              WEBSITE_RUN_FROM_PACKAGE: "1",
              WEBSITE_NODE_DEFAULT_VERSION: "8.11.1"
            }
          }
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
            } catch (err) {
              throw new FileError(err.message);
            }

            return Promise.resolve(result);
          }, 10000);
        });
    } catch (err) {
      if (err.constructor === FileError) {
        throw err;
      }
      throw new DeploymentError(err.message);
    }
  }

  private setClientState(userSubscriptionItem: SubscriptionItem): void {
    if (this.webClient === undefined) {
      this.webClient = this.createWebClient(userSubscriptionItem);
    } else if (
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
      throw new SubscriptionError(
        "Subscription Item cannot have undefined values."
      );
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
      this.setClientState(subscriptionItem);
    } catch (err) {
      throw new AuthorizationError(err.message);
    }

    ValidationHelper.validateFunctionAppName(appName);

    if (this.webClient === undefined) {
      throw new AuthorizationError(
        "Website management client cannot be undefined."
      );
    }

    return await this.webClient
      .checkNameAvailability(appName + config.functionAppDomain, "Site", {
        isFqdn: true
      })
      .then(res => {
        return res.nameAvailable;
      })
      .catch(err => {
        throw new ConnectionError(err.message);
      });
  }
}
