import { SubscriptionItem } from "../azure-auth/azureAuth";
import { WebSiteManagementClient } from "azure-arm-website";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError,
  AppServiceError
} from "../../errors";
import { CONSTANTS, OS, AppType, AzureResourceType } from "../../constants";
import { AppNameValidationResult, NameValidator } from "../utils/nameValidator";
import {
  AppServicePlanCollection,
  AppServicePlan
} from "azure-arm-website/lib/models";
import { ServiceClientCredentials } from "ms-rest";
import { NameGenerator } from "../utils/nameGenerator";

export interface AppServicePlanSelection {
  subscriptionItem: SubscriptionItem;
  resourceGroup: string;
  name: string;
}

export class AppServiceProvider {
  private webClient: WebSiteManagementClient | undefined;

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

  private async checkASPExistence(name: string): Promise<boolean> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const allASP: AppServicePlanCollection = await this.webClient.appServicePlans.list();
    return allASP.some(asp => {
      return asp.name === name;
    });
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
      const validName = await this.generateValidASPName(
        aspSelection.subscriptionItem,
        name
      );
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

  private async generateValidASPName(
    userSubscription: SubscriptionItem,
    name: string
  ): Promise<string> {
    let generatedName: string = NameGenerator.generateName(
      name,
      AzureResourceType.AppService
    );
    let isValid: boolean = await this.validateASPName(
      generatedName,
      userSubscription
    );

    let tries = 0;
    while (tries < CONSTANTS.VALIDATION_LIMIT && !isValid) {
      generatedName = NameGenerator.generateName(
        name,
        AzureResourceType.AppService
      );
      isValid = await this.validateASPName(name, userSubscription);
      tries++;
    }
    if (tries >= CONSTANTS.VALIDATION_LIMIT) {
      throw new AppServiceError(
        CONSTANTS.ERRORS.TRIES_EXCEEDED("app service plan")
      );
    }
    return generatedName;
  }

  private async validateASPName(
    name: string,
    userSubscription: SubscriptionItem
  ): Promise<boolean> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const exist = await this.checkASPExistence(name);
    return !exist;
  }
}
