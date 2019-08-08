import { SubscriptionItem } from "../azure-auth/azureAuth";
import { ResourceManager } from "../azure-arm/resourceManager";
import { ResourceGroup } from "azure-arm-resource/lib/resource/models";
import { ResourceManagementClient } from "azure-arm-resource/lib/resource/resourceManagementClient";
import {
  ResourceGroupError,
  AuthorizationError,
  DeploymentError
} from "../../errors";
import { CONSTANTS } from "../../constants";
import { NameGenerator } from "../utils/nameGenerator";

export interface ResourceGroupSelection {
  subscriptionItem: SubscriptionItem;
  resourceGroupName: string;
  location: string;
}

export class ResourceGroupDeploy {
  private azureResourceClient: ResourceManagementClient | undefined;

  private setAzureResourceClient(userSubscriptionItem: SubscriptionItem) {
    if (
      this.azureResourceClient === undefined ||
      this.azureResourceClient.subscriptionId !==
        userSubscriptionItem.subscriptionId
    ) {
      this.azureResourceClient = new ResourceManager().getResourceManagementClient(
        userSubscriptionItem
      );
    }
  }

  public async createResourceGroup(
    resourceGroupSelection: ResourceGroupSelection
  ): Promise<void> {
    this.setAzureResourceClient(resourceGroupSelection.subscriptionItem);
    try {
      if (this.azureResourceClient === undefined) {
        throw new AuthorizationError(
          CONSTANTS.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED
        );
      }
      const { resourceGroupName, location } = resourceGroupSelection;
      const options: ResourceGroup = {
        name: resourceGroupName,
        location: location
      };

      await this.azureResourceClient.resourceGroups.createOrUpdate(
        resourceGroupName,
        options
      );
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
      isValid = await this.validateResourceGroupNameWithMultipleSubscriptions(
        generatedName,
        userSubscriptionItems
      );
      tries++;
    }
    if (tries >= CONSTANTS.VALIDATION_LIMIT) {
      throw new ResourceGroupError(
        CONSTANTS.ERRORS.CREATION_TRIES_EXCEEDED("resource group")
      );
    }
    return generatedName;
  }

  private async validateResourceGroupNameWithMultipleSubscriptions(
    name: string,
    userSubscriptionItems: SubscriptionItem[]
  ): Promise<boolean> {
    let isValid: boolean = true;
    userSubscriptionItems.forEach(async userSubscriptionItem => {
      isValid =
        isValid &&
        (await this.validateResourceGroupNameWithSubscription(
          name,
          userSubscriptionItem
        ));
    });
    return isValid;
  }

  private async validateResourceGroupNameWithSubscription(
    name: string,
    userSubscriptionItem: SubscriptionItem
  ): Promise<boolean> {
    this.setAzureResourceClient(userSubscriptionItem);
    if (this.azureResourceClient === undefined) {
      throw new AuthorizationError(
        CONSTANTS.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED
      );
    }
    const exist = await this.azureResourceClient.resourceGroups.checkExistence(
      name
    );
    return !exist;
  }
}
