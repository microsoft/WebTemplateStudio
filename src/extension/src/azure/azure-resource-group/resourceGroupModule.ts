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

const VALIDATION_LIMIT = 3;

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
  ): Promise<string | undefined> {
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

      let result = await this.azureResourceClient.resourceGroups.createOrUpdate(
        resourceGroupName,
        options
      );
      return result.name;
    } catch (error) {
      throw new DeploymentError(error.message);
    }
  }

  public async generateValidResourceGroupName(
    name: string,
    userSubscriptionItem: SubscriptionItem
  ): Promise<string> {
    this.setAzureResourceClient(userSubscriptionItem);
    
    let generatedName = this.generateResourceGroupName(name);
    let isValid = await this.validateResourceGroupName(generatedName);

    let tries = 0;
    while (tries < VALIDATION_LIMIT && !isValid) {
      generatedName = this.generateResourceGroupName(name);
      isValid = await this.validateResourceGroupName(generatedName);
      tries++;
    }
    if (tries >= VALIDATION_LIMIT) {
      throw new ResourceGroupError(
        CONSTANTS.ERRORS.RESOURCE_GROUP_TRIES_EXCEEDED
      );
    }
    return generatedName;
  }

  private async validateResourceGroupName(name: string): Promise<boolean> {
    if (this.azureResourceClient === undefined) {
      throw new AuthorizationError(
        CONSTANTS.ERRORS.AZURE_RESOURCE_CLIENT_NOT_DEFINED
      );
    }
    let exist = await this.azureResourceClient.resourceGroups.checkExistence(
      name
    );
    return !exist;
  }

  private generateResourceGroupName(userProjectName: string): string {
    let unixTimestamp = Date.now();
    let suffix = this.unixToSuffix(unixTimestamp);
    return userProjectName + "_" + suffix;
  }

  private unixToSuffix(unixTimestamp: any): string {
    let fullDate = new Date(unixTimestamp);
    let year = fullDate.getFullYear().toString();
    // getMonth() returns month as a zero-based value
    let month = (fullDate.getMonth() + 1).toString();
    let date = fullDate.getDate().toString();
    let hour = fullDate.getHours().toString();
    let min = fullDate.getMinutes().toString();
    let sec = fullDate.getSeconds().toString();
    return year.concat(month, date, hour, min, sec);
  }
}
