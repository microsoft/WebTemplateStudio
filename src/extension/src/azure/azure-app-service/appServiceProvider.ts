import { SubscriptionItem } from "../azure-auth/azureAuth";
import WebSiteManagementClient from "azure-arm-website";
import { ServiceClientCredentials } from "ms-rest";
import { SubscriptionClient } from "azure-arm-resource";
import { SubscriptionError } from "../../errors";
import { CONSTANTS } from "../../constants";

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

public async checkWebAppName(name: string, subscriptionItem: SubscriptionItem): Promise<boolean> {
  try {
    this.setWebClient(subscriptionItem);
  } catch (error) {
    throw error.message;
  }
}

}
