import ResourceManagementClient from "azure-arm-resource/lib/resource/resourceManagementClient";
import { SubscriptionItem } from "../azure-auth/azureAuth";
import { ServiceClientCredentials } from "ms-rest";
import { SubscriptionError } from "../errors";

export class ResourceManager {
  private AzureResourceManagementClient: ResourceManagementClient | undefined;

  private setClientState(userSubscriptionItem: SubscriptionItem): void {
    if (
      this.AzureResourceManagementClient === undefined ||
      this.AzureResourceManagementClient.subscriptionId !==
        userSubscriptionItem.subscriptionId
    ) {
      this.AzureResourceManagementClient = this.createResourceManagementClient(
        userSubscriptionItem
      );
    }
  }

  private createResourceManagementClient(
    userSubscriptionItem: SubscriptionItem
  ): ResourceManagementClient {
    let userCredentials: ServiceClientCredentials =
      userSubscriptionItem.session.credentials;
    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(
        "SubscriptionItem cannot have undefined values"
      );
    }
    return new ResourceManagementClient(
      userCredentials,
      userSubscriptionItem.subscriptionId,
      userSubscriptionItem.session.environment.resourceManagerEndpointUrl
    );
  }

  public getResourceManagementClient(
    userSubscriptionItem: SubscriptionItem
  ): ResourceManagementClient {
    this.setClientState(userSubscriptionItem);
    return this.AzureResourceManagementClient!;
  }
}
