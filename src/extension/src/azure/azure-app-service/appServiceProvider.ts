import { SubscriptionItem } from "../azure-auth/azureAuth";
import { WebSiteManagementClient } from "azure-arm-website";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError
} from "../../errors";
import { CONSTANTS, OS, AppType } from "../../constants";
import { AppNameValidationResult, NameValidator } from "../utils/nameValidator";
import {
  AppServicePlanCollection,
  AppServicePlan,
  SkuDescription
} from "azure-arm-website/lib/models";
import { ServiceClientCredentials } from "ms-rest";

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

  // returns a free tier App Service Plan (ASP) if exist, else, create a new basic tier ASP and return it
  // we are unable to create an free tier ASP right now, that's why we are creating the basic one
  public async getAppServicePlan(
    userSubscription: SubscriptionItem,
    resourceGroup: string
  ): Promise<string | undefined> {
    this.setWebClient(userSubscription);
    let asp: AppServicePlan | undefined = await this.findFreeAppServicePlan();
    if (asp === undefined) {
      try {
        asp = await this.createBasicAppServicePlan(
          userSubscription.subscriptionId,
          resourceGroup
        );
      } catch (err) {
        throw new DeploymentError(CONSTANTS.ERRORS.ASP_NOT_FOUND);
      }
    }
    return asp.name;
  }

  private async findFreeAppServicePlan(): Promise<AppServicePlan | undefined> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const allASP: AppServicePlanCollection = await this.webClient.appServicePlans.list();
    return allASP.find(asp => {
      if (asp.kind === OS.Linux && asp.sku !== undefined) {
        return (
          // return a free ASP, or one that's previously created by WebTS
          asp.sku.tier === CONSTANTS.SKU_DESCRIPTION.FREE.tier ||
          asp.name === CONSTANTS.WEBTS_ASP_NAME
        );
      }
    });
  }

  private async createBasicAppServicePlan(
    subscriptionId: string,
    resourceGroup: string
  ): Promise<AppServicePlan> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const appServicePlanSelection: AppServicePlan = {
      kind: OS.Linux,
      sku: CONSTANTS.SKU_DESCRIPTION.BASIC,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US
    };
    return await this.webClient.appServicePlans.createOrUpdate(
      resourceGroup,
      CONSTANTS.WEBTS_ASP_NAME,
      appServicePlanSelection
    );
  }
}
