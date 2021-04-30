import { ResourceManagementClient } from "@azure/arm-resources";
import { ServiceClientCredentials } from "@azure/ms-rest-js";

import { MESSAGES } from "../../constants/messages";
import { SubscriptionError } from "../../errors";
import { SubscriptionItem } from "../azure-auth/azureAuth";

export class ResourceManager {
  private AzureResourceManagementClient: ResourceManagementClient | undefined;

  private createResourceManagementClient(userSubscriptionItem: SubscriptionItem): ResourceManagementClient {
    const userCredentials: ServiceClientCredentials = userSubscriptionItem.session.credentials2;
    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(MESSAGES.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }
    return new ResourceManagementClient(userCredentials, userSubscriptionItem.subscriptionId);
  }

  public getResourceManagementClient(userSubscriptionItem: SubscriptionItem): ResourceManagementClient {
    if (
      this.AzureResourceManagementClient === undefined ||
      this.AzureResourceManagementClient.subscriptionId !== userSubscriptionItem.subscriptionId
    ) {
      this.AzureResourceManagementClient = this.createResourceManagementClient(userSubscriptionItem);
    }
    return this.AzureResourceManagementClient;
  }
}
