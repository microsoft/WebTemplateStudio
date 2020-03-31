import { SubscriptionItem } from "../azure/azure-auth/azureAuth";

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

export class AzureModule extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.Login, this.login],
    [ExtensionCommand.Logout, this.logout],
    [ExtensionCommand.GetUserStatus, this.getUserStatus],
    [ExtensionCommand.GetSubscriptionDataForCosmos, this.getSubscriptionDataForCosmos],
    [ExtensionCommand.GetSubscriptionDataForAppService, this.getSubscriptionDataForAppService],
    [ExtensionCommand.GetValidAppServiceName, this.getValidAppServiceName],
    [ExtensionCommand.GetValidCosmosName, this.getValidCosmosName],
    [ExtensionCommand.ValidateCosmosName, this.validateCosmosName],
    [ExtensionCommand.ValidateAppServiceName, this.validateAppServiceName],
  ]);

  public async login(message: any): Promise<IPayloadResponse> {
    Logger.appendLog("EXTENSION", "info", "Attempt to log user in");
    const isLoggedIn = await AzureServices.Login();
    if (isLoggedIn) {
      Logger.appendLog("EXTENSION", "info", "User logged in");
      return this.getUserStatus(message);
    }
    throw new AuthorizationError(CONSTANTS.ERRORS.LOGIN_TIMEOUT);
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

  public async getSubscriptionDataForCosmos(message: any): Promise<IPayloadResponse> {
    const data = await AzureServices.getSubscriptionData(message.subscription, AzureResourceType.Cosmos);
    return {
      payload: {
        ...data,
        scope: message.payload.scope,
      },
    };
  }

  public async getSubscriptionDataForAppService(message: any): Promise<IPayloadResponse> {
    const data = await AzureServices.getSubscriptionData(message.subscription, AzureResourceType.AppService);
    return {
      payload: {
        ...data,
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
}
