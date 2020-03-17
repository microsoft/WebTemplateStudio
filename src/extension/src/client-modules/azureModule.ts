import { AzureAuth, SubscriptionItem, LocationItem } from "../azure/azure-auth/azureAuth";

import { CONSTANTS, AzureResourceType, ExtensionCommand } from "../constants";

import { AuthorizationError } from "../errors";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { Logger } from "../utils/logger";
import { AzureServices } from "../azure/azureServices";
import { NameGenerator } from "../azure/utils/nameGenerator";

interface Subscription {
  name: string;
  isMicrosoftLearn: boolean;
}

interface SubscriptionData {
  resourceGroups: ResourceGroup[];
  locations: Location[];
}

interface ResourceGroup {
  name: string;
}

interface Location {
  name: string;
}

export class AzureModule extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.Login, this.login],
    [ExtensionCommand.Logout, this.logout],
    [ExtensionCommand.GetUserStatus, this.getUserStatus],
    [ExtensionCommand.GetSubscriptionDataForCosmos, this.getSubscriptionDataForCosmos],
    [ExtensionCommand.GetSubscriptionDataForAppService, this.getSubscriptionDataForAppService],
    [ExtensionCommand.GetValidAppServiceName, this.GetValidAppServiceName],
    [ExtensionCommand.GetValidCosmosName, this.GetValidCosmosName],
    [ExtensionCommand.ValidateCosmosName, this.validateCosmosName],
    [ExtensionCommand.ValidateAppServiceName, this.validateAppServiceName],
  ]);

  public async login(message: any): Promise<IPayloadResponse> {
    Logger.appendLog("EXTENSION", "info", "Attempt to log user in");
    const isLoggedIn = await AzureAuth.login();
    if (isLoggedIn) {
      Logger.appendLog("EXTENSION", "info", "User logged in");
      return this.getUserStatus(message);
    }
    throw new AuthorizationError(CONSTANTS.ERRORS.LOGIN_TIMEOUT);
  }

  public async logout(message: any): Promise<IPayloadResponse> {
    const success = await AzureAuth.logout();
    const payload = { scope: message.payload.scope, success };
    return { payload };
  }

  public async getUserStatus(message: any): Promise<IPayloadResponse> {
    const userStatus = await AzureServices.getUserStatus();
    const subscriptions = this.getFormattedSubscriptions(userStatus.subscriptions);
    return {
      payload: {
        scope: message.payload.scope,
        email: userStatus.email,
        subscriptions,
      },
    };
  }

  public async getSubscriptionDataForCosmos(message: any): Promise<IPayloadResponse> {
    const data = await this.getSubscriptionData(message.subscription, AzureResourceType.Cosmos);
    return {
      payload: {
        ...data,
        scope: message.payload.scope,
      },
    };
  }

  public async getSubscriptionDataForAppService(message: any): Promise<IPayloadResponse> {
    const data = await this.getSubscriptionData(message.subscription, AzureResourceType.AppService);
    return {
      payload: {
        ...data,
        scope: message.payload.scope,
      },
    };
  }

  public async GetValidAppServiceName(message: any): Promise<IPayloadResponse> {
    const validName = await NameGenerator.generateValidAzureTypeName(message.projectName, AzureResourceType.AppService);
    return {
      payload: {
        validName,
        scope: message.payload.scope,
      },
    };
  }

  public async GetValidCosmosName(message: any): Promise<IPayloadResponse> {
    const validName = await NameGenerator.generateValidAzureTypeName(message.projectName, AzureResourceType.Cosmos);
    return {
      payload: {
        validName,
        scope: message.payload.scope,
      },
    };
  }

  public async validateAppServiceName(message: any): Promise<IPayloadResponse> {
    const validateResult = await AzureServices.validateAppServiceName(message.appName, message.subscription);
    return {
      payload: {
        scope: message.payload.scope,
        ...validateResult,
      },
    };
  }

  public async validateCosmosName(message: any): Promise<IPayloadResponse> {
    const validateResult = await AzureServices.validateCosmosName(message.appName, message.subscription);
    return {
      payload: {
        scope: message.payload.scope,
        ...validateResult,
      },
    };
  }

  private getFormattedSubscriptions(subscriptions: SubscriptionItem[]): Subscription[] {
    return subscriptions.map(subscription => {
      return {
        name: subscription.label,
        isMicrosoftLearn: AzureServices.IsMicrosoftLearnSubscription(subscription),
      };
    });
  }

  private async getSubscriptionData(subscriptionName: string, AzureType: AzureResourceType): Promise<SubscriptionData> {
    const subscription = AzureServices.getSubscription(subscriptionName);
    const resourceGroups = await this.getResourceGroups(subscription);
    const locations = await this.getLocations(subscription, AzureType);

    return {
      resourceGroups,
      locations,
    };
  }

  private async getResourceGroups(subscription: SubscriptionItem): Promise<ResourceGroup[]> {
    const items = await AzureAuth.getAllResourceGroupItems(subscription);
    const resources: ResourceGroup[] = [];
    items.map(item => resources.push({ name: item.name }));
    return resources;
  }

  private async getLocations(subscription: SubscriptionItem, AzureType: AzureResourceType): Promise<Location[]> {
    let items: LocationItem[] = [];
    switch (AzureType) {
      case AzureResourceType.Cosmos:
        items = await AzureAuth.getLocationsForCosmos(subscription);
        break;
      case AzureResourceType.AppService:
        items = await AzureAuth.getLocationsForApp(subscription);
        break;
    }
    const locations: Location[] = [];
    items.map(item => locations.push({ name: item.locationDisplayName }));
    return locations;
  }
}
