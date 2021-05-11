import { SubscriptionItem } from "../azure/azure-auth/azureAuth";
import { AzureServices } from "../azure/azureServices";
import { NameGenerator } from "../azure/utils/nameGenerator";
import { EXTENSION_COMMANDS } from "../constants/commands";
import { AzureResourceType } from "../constants/constants";
import { MESSAGES } from "../constants/messages";
import { AuthorizationError } from "../errors";
import { Logger } from "../utils/logger";
import { IPayloadResponse, WizardServant } from "../wizardServant";

interface Subscription {
  name: string;
  isMicrosoftLearn: boolean;
}

export class AzureModule extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.AZURE_LOGIN, this.login],
    [EXTENSION_COMMANDS.AZURE_LOGOUT, this.logout],
    [EXTENSION_COMMANDS.GET_USER_STATUS, this.getUserStatus],
    [EXTENSION_COMMANDS.GET_RESOURCE_GROUPS, this.getResourceGroups],
    [EXTENSION_COMMANDS.GET_LOCATIONS, this.getLocations],
    [EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME, this.getValidAppServiceName],
    [EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME, this.getValidCosmosName],
    [EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME, this.validateCosmosName],
    [EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME, this.validateAppServiceName],
  ]);

  public async login(): Promise<IPayloadResponse> {
    Logger.appendLog("EXTENSION", "info", "Attempt to log user in");
    const isLoggedIn = await AzureServices.Login();
    if (isLoggedIn) {
      Logger.appendLog("EXTENSION", "info", "User logged in");
      return this.getUserStatus();
    }
    throw new AuthorizationError(MESSAGES.ERRORS.LOGIN_TIMEOUT);
  }

  public async logout(): Promise<IPayloadResponse> {
    const success = await AzureServices.Logout();
    const payload = { success };
    return { payload };
  }

  public async getUserStatus(): Promise<IPayloadResponse> {
    const userStatus = await AzureServices.getUserStatus();
    const subscriptions = this.getFormattedSubscriptions(userStatus.subscriptions);
    return {
      payload: {
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
      },
    };
  }

  public async getLocations(message: any): Promise<IPayloadResponse> {
    const locations = await AzureServices.getLocations(message.subscription, message.azureServiceType);
    return {
      payload: {
        locations,
      },
    };
  }

  public async getValidAppServiceName(message: any): Promise<IPayloadResponse> {
    const validName = await NameGenerator.generateValidAzureTypeName(message.projectName, AzureResourceType.AppService);
    return {
      payload: {
        validName,
      },
    };
  }

  public async getValidCosmosName(message: any): Promise<IPayloadResponse> {
    const validName = await NameGenerator.generateValidAzureTypeName(message.projectName, AzureResourceType.Cosmos);
    return {
      payload: {
        validName,
      },
    };
  }

  public async validateAppServiceName(message: any): Promise<IPayloadResponse> {
    const validateResult = await AzureServices.validateAppServiceName(message.appName, message.subscription);
    return {
      payload: {
        ...validateResult,
      },
    };
  }

  public async validateCosmosName(message: any): Promise<IPayloadResponse> {
    try {
      const validateResult = await AzureServices.validateCosmosName(message.appName, message.subscription);
      return {
        payload: {
          ...validateResult,
        },
      };
    } catch (error) {
      return { payload: undefined };
    }
  }

  private getFormattedSubscriptions(subscriptions: SubscriptionItem[]): Subscription[] {
    return subscriptions.map((subscription) => {
      return {
        name: subscription.label,
        isMicrosoftLearn: AzureServices.IsMicrosoftLearnSubscription(subscription),
      };
    });
  }
}
