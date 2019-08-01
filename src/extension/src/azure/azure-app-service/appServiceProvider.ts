import * as appRoot from "app-root-path";
import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import { WebSiteManagementClient } from "azure-arm-website";
import { ServiceClientCredentials } from "ms-rest";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError
} from "../../errors";
import { CONSTANTS, AppType } from "../../constants";
import { AppNameValidationResult, NameValidator } from "../utils/nameValidator";
import { ARMFileHelper } from "../azure-arm/armFileHelper";
import ResourceManagementClient, {
  ResourceManagementModels
} from "azure-arm-resource/lib/resource/resourceManagementClient";
import { ResourceManager } from "../azure-arm/resourceManager";

export interface AppServiceSelections {
  siteName: string;
  subscriptionItem: SubscriptionItem;
  resourceGroupItem: ResourceGroupItem;
  appServicePlanName: string;
  sku: string;
  linuxFxVersion: string;
  location: string;
}

const APP_SERVICE_DEPLOYMENT_SUFFIX = "-app-service";

export class AppServiceProvider {
  private webClient: WebSiteManagementClient | undefined;

  public async createWebApp(
    selections: AppServiceSelections,
    appPath: string
  ): Promise<void> {
    try {
      this.setWebClient(selections.subscriptionItem);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }

    const template = this.getAppServiceARMTemplate();
    const parameters = this.getAppServiceARMParameter(selections);

    const deploymentParams = parameters.parameters;

    try {
      let options: ResourceManagementModels.Deployment = {
        properties: {
          mode: "Incromental",
          parameters: deploymentParams,
          template: template
        }
      };

      const azureResourceClient: ResourceManagementClient = new ResourceManager().getResourceManagementClient(
        selections.subscriptionItem
      );

      this.writeARMTemplatesToApp(appPath, template, parameters);

      await azureResourceClient.deployments.createOrUpdate(
        selections.resourceGroupItem.name,
        selections.siteName + APP_SERVICE_DEPLOYMENT_SUFFIX,
        options
      );
    } catch (error) {
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
    const credentials: ServiceClientCredentials =
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

  public async checkWebAppName(
    appName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<string | undefined> {
    try {
      this.setWebClient(subscriptionItem);
    } catch (error) {
      return error.message;
    }

    const validationStatus: AppNameValidationResult = NameValidator.validateAppName(
      appName
    );
    if (!validationStatus.isValid) {
      // returns error message
      return validationStatus.message;
    }
    if (this.webClient === undefined) {
      return CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED;
    }
    return await this.webClient
      .checkNameAvailability(appName + CONSTANTS.APP_SERVICE_DOMAIN, "Site", {
        isFqdn: true
      })
      .then(res => {
        if (res.nameAvailable) {
          return undefined;
        } else {
          return CONSTANTS.ERRORS.APP_NAME_NOT_AVAILABLE(appName, AppType.Web);
        }
      })
      .catch(error => {
        return error.message;
      });
  }

  private getAppServiceARMTemplate(): any {
    const templatePath = path.join(
      appRoot.toString(),
      "src",
      "azure",
      "azure-app-service",
      "arm-templates",
      "template.json"
    );
    return JSON.parse(fs.readFileSync(templatePath, "utf8"));
  }

  private getAppServiceARMParameter(selections: AppServiceSelections): any {
    const parameterPath = path.join(
      appRoot.toString(),
      "src",
      "azure",
      "azure-app-service",
      "arm-templates",
      "parameters.json"
    );

    let parameters = JSON.parse(fs.readFileSync(parameterPath, "utf8"));

    parameters.parameters = {
      webAppName: {
        value: selections.siteName
      },
      appServicePlanName: {
        value: selections.appServicePlanName
      },
      sku: {
        value: selections.sku
      },
      linuxFxVersion: {
        value: selections.linuxFxVersion
      },
      location: {
        value: selections.location
      }
    };
  }

  private writeARMTemplatesToApp(
    appPath: string,
    template: any,
    parameters: any
  ) {
    ARMFileHelper.createDirIfNonExistent(path.join(appPath, "arm-templates"));
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "??"),
      template
    );
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "??"),
      parameters
    );
  }
}
