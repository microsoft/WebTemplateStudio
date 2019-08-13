import * as appRoot from "app-root-path";
import * as fs from "fs";
import * as path from "path";
import { ServiceClientCredentials } from "ms-rest";
import { WebSiteManagementClient } from "azure-arm-website";
import {
  AppServicePlanCollection,
  AppServicePlan,
  StringDictionary
} from "azure-arm-website/lib/models";
import ResourceManagementClient, {
  ResourceManagementModels
} from "azure-arm-resource/lib/resource/resourceManagementClient";

import { CONSTANTS, OS, AppType, AzureResourceType } from "../../constants";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError,
  AppServiceError
} from "../../errors";

import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import { NameGenerator } from "../utils/nameGenerator";
import { AppNameValidationResult, NameValidator } from "../utils/nameValidator";
import { ResourceManager } from "../azure-arm/resourceManager";
import { ARMFileHelper } from "../azure-arm/armFileHelper";

export interface AppServicePlanSelection {
  subscriptionItem: SubscriptionItem;
  resourceGroup: string;
  name: string;
}

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

  // returns the id of the instance created
  public async createWebApp(
    selections: AppServiceSelections,
    appPath: string
  ): Promise<string | undefined> {
    const template = this.getAppServiceARMTemplate();
    const parameters = this.getAppServiceARMParameter(selections);
    const deploymentParams = parameters.parameters;
    try {
      const options: ResourceManagementModels.Deployment = {
        properties: {
          mode: "Incremental",
          parameters: deploymentParams,
          template: template
        }
      };
      const azureResourceClient: ResourceManagementClient = new ResourceManager().getResourceManagementClient(
        selections.subscriptionItem
      );
      this.writeARMTemplatesToApp(appPath, template, parameters);
      const deploymentName = (
        selections.siteName + APP_SERVICE_DEPLOYMENT_SUFFIX
      ).substr(0, CONSTANTS.DEPLOYMENT_NAME.MAX_LENGTH);
      const result = await azureResourceClient.deployments.createOrUpdate(
        selections.resourceGroupItem.name,
        deploymentName,
        options
      );
      return result.id;
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
      name: {
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
      subscriptionId: {
        value: selections.subscriptionItem.subscriptionId
      },
      location: {
        value: selections.location
      }
    };

    return parameters;
  }

  private writeARMTemplatesToApp(
    appPath: string,
    template: any,
    parameters: any
  ) {
    ARMFileHelper.createDirIfNonExistent(path.join(appPath, "arm-templates"));
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "web-app-template.json"),
      template
    );
    ARMFileHelper.writeObjectToJsonFile(
      path.join(appPath, "arm-templates", "web-app-parameters.json"),
      parameters
    );
  }

  // Creates a Basic Tier App Service Plan (ASP)
  public async createAppServicePlan(
    aspSelection: AppServicePlanSelection
  ): Promise<string> {
    this.setWebClient(aspSelection.subscriptionItem);
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const appServicePlanSelection: AppServicePlan = {
      kind: OS.Linux,
      sku: CONSTANTS.SKU_DESCRIPTION.BASIC,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US
    };
    try {
      const validName = await this.generateValidASPName(aspSelection.name);
      await this.webClient.appServicePlans.createOrUpdate(
        aspSelection.resourceGroup,
        validName,
        appServicePlanSelection
      );
      return validName;
    } catch (error) {
      throw new DeploymentError(error.message);
    }
  }

  public async generateValidASPName(name: string): Promise<string> {
    let generatedName: string = NameGenerator.generateName(
      name,
      AzureResourceType.AppServicePlan
    );
    let isValid: boolean = await this.validateASPName(generatedName);
    let tries = 0;
    while (tries < CONSTANTS.VALIDATION_LIMIT && !isValid) {
      generatedName = NameGenerator.generateName(
        name,
        AzureResourceType.AppServicePlan
      );
      isValid = await this.validateASPName(generatedName);
      tries++;
    }
    if (tries >= CONSTANTS.VALIDATION_LIMIT) {
      throw new AppServiceError(
        CONSTANTS.ERRORS.CREATION_TRIES_EXCEEDED("app service plan")
      );
    }
    return generatedName;
  }

  private async validateASPName(name: string): Promise<boolean> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const exist = await this.checkASPExistence(name);
    return !exist;
  }

  private async checkASPExistence(name: string): Promise<boolean> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const allASP: AppServicePlanCollection = await this.webClient.appServicePlans.list();
    return allASP.some(asp => {
      return asp.name === name;
    });
  }

  public async updateAppSettings(
    resourceGroupName: string,
    webAppName: string,
    settings: StringDictionary
  ): Promise<void> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    this.webClient.webApps.updateApplicationSettings(
      resourceGroupName,
      webAppName,
      settings
    );
  }
}
