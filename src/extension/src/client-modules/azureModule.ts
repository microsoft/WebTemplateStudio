import { SubscriptionItem } from "../azure/azure-auth/azureAuth";

import { AzureResourceType } from "../constants/constants";
import { ExtensionCommand } from "../constants/commands";

import { AuthorizationError } from "../errors";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { Logger } from "../utils/logger";
import { AzureServices } from "../azure/azureServices";
import { NameGenerator } from "../azure/utils/nameGenerator";
import { MESSAGES } from "../constants/messages";

interface Subscription {
  name: string;
  isMicrosoftLearn: boolean;
}

export class AzureModule extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.AZURE_LOGIN, this.login],
    [ExtensionCommand.AZURE_LOGOUT, this.logout],
    [ExtensionCommand.GET_USER_STATUS, this.getUserStatus],
    [ExtensionCommand.GET_RESOURCE_GROUPS, this.getResourceGroups],
    [ExtensionCommand.GET_LOCATIONS, this.getLocations],
    [ExtensionCommand.GET_VALID_APP_SERVICE_NAME, this.getValidAppServiceName],
    [ExtensionCommand.GET_VALID_COSMOS_NAME, this.getValidCosmosName],
    [ExtensionCommand.VALIDATE_COSMOS_NAME, this.validateCosmosName],
    [ExtensionCommand.VALIDATE_APPSERVICE_NAME, this.validateAppServiceName],
  ]);

  public async login(message: any): Promise<IPayloadResponse> {
    Logger.appendLog("EXTENSION", "info", "Attempt to log user in");
    const isLoggedIn = await AzureServices.Login();
    if (isLoggedIn) {
      Logger.appendLog("EXTENSION", "info", "User logged in");
      return this.getUserStatus(message);
    }
    throw new AuthorizationError(MESSAGES.ERRORS.LOGIN_TIMEOUT);
  }

  public async logout(message: any): Promise<IPayloadResponse> {
    const success = await AzureServices.Logout();
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

  public async getResourceGroups(message: any): Promise<IPayloadResponse> {
    const resourceGroups = await AzureServices.getResourceGroups(message.subscription);
    return {
      payload: {
        resourceGroups,
        scope: message.payload.scope,
      },
    };
  }

  public async getLocations(message: any): Promise<IPayloadResponse> {
    const locations = await AzureServices.getLocations(message.subscription, message.azureServiceType);
    return {
      payload: {
        locations,
        scope: message.payload.scope,
      },
    };
  }

  public async getValidAppServiceName(message: any): Promise<IPayloadResponse> {
    const validName = await NameGenerator.generateValidAzureTypeName(message.projectName, AzureResourceType.AppService);
    return {
      payload: {
        validName,
        scope: message.payload.scope,
      },
    };
  }

  public async getValidCosmosName(message: any): Promise<IPayloadResponse> {
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
    try{
      const validateResult = await AzureServices.validateCosmosName(message.appName, message.subscription);
    return {
      payload: {
        scope: message.payload.scope,
        ...validateResult,
      },
    };
    }catch(error) {
      return {
        payload: {
          scope: message.payload.scope,
        }
      };
    }
  }

  private getFormattedSubscriptions(subscriptions: SubscriptionItem[]): Subscription[] {
    return subscriptions.map(subscription => {
      return {
        name: subscription.label,
        isMicrosoftLearn: AzureServices.IsMicrosoftLearnSubscription(subscription),
      };
    });
  }
}
