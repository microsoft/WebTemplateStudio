import { SubscriptionItem } from "../azure-auth/azureAuth";
import { ResourceManager } from "../azure-arm/resourceManager";
import { ResourceGroup, ResourceGroupListResult } from "azure-arm-resource/lib/resource/models";
import { ResourceManagementClient } from "azure-arm-resource/lib/resource/resourceManagementClient";
import { ResourceGroupError, AuthorizationError, DeploymentError } from "../../errors";
import { CONSTANTS } from "../../constants/constants";
import { NameGenerator } from "../utils/nameGenerator";
import { MESSAGES } from "../../constants/messages";

export interface ResourceGroupSelection {
  subscriptionItem: SubscriptionItem;
  resourceGroupName: string;
  location: string;
}

export class ResourceGroupDeploy {
  private azureResourceClient: ResourceManagementClient | undefined;

  private setAzureResourceClient(userSubscriptionItem: SubscriptionItem): void {
    if (
      this.azureResourceClient === undefined ||
      this.azureResourceClient.subscriptionId !== userSubscriptionItem.subscriptionId
    ) {
      this.azureResourceClient = new ResourceManager().getResourceManagementClient(userSubscriptionItem);
    }
  }

  public async createResourceGroup(resourceGroupSelection: ResourceGroupSelection): Promise<void> {
    this.setAzureResourceClient(resourceGroupSelection.subscriptionItem);
    try {
      if (this.azureResourceClient === undefined) {
        throw new AuthorizationError(MESSAGES.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED);
      }
      const { resourceGroupName, location } = resourceGroupSelection;
      const options: ResourceGroup = {
        name: resourceGroupName,
        location: location,
      };

      await this.azureResourceClient.resourceGroups.createOrUpdate(resourceGroupName, options);
    } catch (error) {
      throw new DeploymentError(error.message);
    }
  }

  public async generateValidResourceGroupName(
    name: string,
    userSubscriptionItems: SubscriptionItem[]
  ): Promise<string> {
    let generatedName: string = NameGenerator.generateName(name);
    // this allows the generated name to be validated against multiple subscriptions
    let isValid: boolean = await this.validateResourceGroupNameWithMultipleSubscriptions(
      generatedName,
      userSubscriptionItems
    );

    let tries = 0;
    while (tries < CONSTANTS.VALIDATION_LIMIT && !isValid) {
      generatedName = NameGenerator.generateName(name);
      isValid = await this.validateResourceGroupNameWithMultipleSubscriptions(generatedName, userSubscriptionItems);
      tries++;
    }
    if (tries >= CONSTANTS.VALIDATION_LIMIT) {
      throw new ResourceGroupError(MESSAGES.ERRORS.CREATION_TRIES_EXCEEDED("resource group"));
    }
    return generatedName;
  }

  private async validateResourceGroupNameWithMultipleSubscriptions(
    name: string,
    userSubscriptionItems: SubscriptionItem[]
  ): Promise<boolean> {
    let isValid = true;
    userSubscriptionItems.forEach(async (userSubscriptionItem) => {
      isValid = isValid && (await this.validateResourceGroupNameWithSubscription(name, userSubscriptionItem));
    });
    return isValid;
  }

  private async validateResourceGroupNameWithSubscription(
    name: string,
    userSubscriptionItem: SubscriptionItem
  ): Promise<boolean> {
    this.setAzureResourceClient(userSubscriptionItem);
    if (this.azureResourceClient === undefined) {
      throw new AuthorizationError(MESSAGES.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED);
    }
    const exist = await this.azureResourceClient.resourceGroups.checkExistence(name);
    return !exist;
  }

  public async GetResourceGroups(subscriptionItem: SubscriptionItem): Promise<ResourceGroupListResult> {
    this.setAzureResourceClient(subscriptionItem);
    if (this.azureResourceClient === undefined) {
      throw new AuthorizationError(MESSAGES.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED);
    }
    const groups = await this.azureResourceClient.resourceGroups.list();
    return groups;
  }

  public async GetResourceGroup(name: string, subscription: SubscriptionItem): Promise<ResourceGroup | undefined> {
    const resourceGroups = await this.GetResourceGroups(subscription);
    return resourceGroups.find((r) => r.name === name);
  }

  public async ExistResourceGroup(name: string, subscription: SubscriptionItem): Promise<boolean> {
    const resourceGroup = await this.GetResourceGroup(name, subscription);
    return resourceGroup !== undefined;
  }
}
