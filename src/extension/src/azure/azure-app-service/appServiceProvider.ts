import { SubscriptionItem } from "../azure-auth/azureAuth";
import { WebSiteManagementClient } from "azure-arm-website";
import { ServiceClientCredentials, ApiKeyCredentials } from "ms-rest";
import { SubscriptionError, AuthorizationError } from "../../errors";
import { CONSTANTS, AppType } from "../../constants";
import { AppNameValidationResult, NameValidator } from "../utils/nameValidator";
import {
  AppServicePlanCollection,
  AppServicePlan,
  SkuDescription
} from "azure-arm-website/lib/models";

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

  // returns a free tier App Service Plan (ASP), if not found, create a new one and return it
  public async getFreeAppServicePlan(
    userSubscription: SubscriptionItem,
    resourceGroup: string // figure this out from the upper layer!
  ): Promise<string> {
    this.setWebClient(userSubscription);
    const freeASP:
      | AppServicePlan
      | undefined = await this.findFreeAppServicePlan();
    if (freeASP === undefined) {
      this.createFreeAppServicePlan(
        userSubscription.subscriptionId,
        resourceGroup
      );
    }
    return "";
  }

  private async findFreeAppServicePlan(): Promise<AppServicePlan | undefined> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const allASP: AppServicePlanCollection = await this.webClient.appServicePlans.list();
    return allASP.find(asp => {
      if (asp.kind === "linux" && asp.sku !== undefined) {
        return asp.sku.tier === "Free";
      }
    });
  }

  private async createFreeAppServicePlan(
    subscriptionId: string,
    resourceGroup: string
  ): Promise<string> {
    if (this.webClient === undefined) {
      throw new AuthorizationError(CONSTANTS.ERRORS.WEBSITE_CLIENT_NOT_DEFINED);
    }
    const sku: SkuDescription = {
      // capacity: 1,
      // family: "F",
      // name: "F1",
      // size: "F1",
      tier: "Free"
    };
    const appServicePlanSelection: AppServicePlan = {
      // kind: "linux",
      // location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
      // name: "webts_linux_centralus",
      // resourceGroup: resourceGroup,
      sku: sku,
      // subscription: subscriptionId
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US
    };
    await this.webClient.appServicePlans.createOrUpdate(
      resourceGroup,
      "webts_linux_centralus",
      appServicePlanSelection
    );
    return "";
  }
}
