import { ResourceManagementClient } from "@azure/arm-resources";
import { SubscriptionClient, SubscriptionModels } from "@azure/arm-subscriptions";
import * as vscode from "vscode";

import { CONSTANTS } from "../../constants/constants";
import { MESSAGES } from "../../constants/messages";
import { AuthorizationError, ResourceGroupError } from "../../errors";
import { AzureAccount, AzureSession } from "./azure-account.api"; // Other extensions need to copy this .d.ts to their repository.

const MICROSOFT_DOCUMENT_DB_PROVIDER = "Microsoft.DocumentDb";
const MICROSOFT_WEB_PROVIDER = "Microsoft.Web";

const WEB_RESOURCE_SITES = "sites";
const DOCUMENT_DB_RESOURCE_ACCOUNTS = "databaseAccounts";

export interface SubscriptionItem {
  label: string;
  subscriptionId: string;
  session: AzureSession;
  subscription: SubscriptionModels.Subscription;
}

export interface ResourceGroupItem {
  name: string;
  location: string;
  resourceGroup: {};
}

export interface LocationItem {
  locationDisplayName: string;
}

interface PartialList<T> extends Array<T> {
  nextLink?: string;
}

export abstract class AzureAuth {
  private static api: AzureAccount;

  private static locationsCache: LocationItem[] | undefined;

  private static async initialize(): Promise<void> {
    /**
     * Initializes the AzureAccount object if not initialized.
     * Will get called whenever a function that uses AzureAccount object is called
     */
    if (this.api === undefined) {
      this.api = vscode.extensions.getExtension<AzureAccount>("ms-vscode.azure-account")!.exports;
    }
  }

  public static async promptUsersToLogout(): Promise<any> {
    return await vscode.window
      .showInformationMessage(
        MESSAGES.DIALOG_MESSAGES.logoutPrompt,
        ...[MESSAGES.DIALOG_RESPONSES.yes, MESSAGES.DIALOG_RESPONSES.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        const userConfirmation = {
          signOut: false,
        };
        if (selection === MESSAGES.DIALOG_RESPONSES.yes) {
          userConfirmation.signOut = true;
        }
        return { payload: userConfirmation };
      });
  }

  public static async login(): Promise<boolean> {
    this.initialize();
    if (this.api.status !== CONSTANTS.AZURE_LOGIN_STATUS.LOGGED_IN) {
      await vscode.commands.executeCommand("azure-account.login");
      // Make sure it did not return from timeout
      if (this.api.status === CONSTANTS.AZURE_LOGIN_STATUS.LOGGING_IN) {
        throw new AuthorizationError(MESSAGES.ERRORS.LOGIN_TIMEOUT);
      }
      return true;
    } else {
      return true;
    }
  }
  public static async logout(): Promise<boolean> {
    const userConfirmation = await AzureAuth.promptUsersToLogout();
    if (!userConfirmation.payload.signOut) {
      return false;
    }
    this.initialize();
    if (this.api.status === CONSTANTS.AZURE_LOGIN_STATUS.LOGGED_IN) {
      await vscode.commands.executeCommand("azure-account.logout");
      // Make sure it did not return from timeout
      if (this.api.status === CONSTANTS.AZURE_LOGIN_STATUS.LOGGED_IN) {
        throw new AuthorizationError(MESSAGES.ERRORS.LOGOUT_FAILED);
      }
    }
    return true;
  }
  public static getEmail(): string {
    this.initialize();
    if (this.api.sessions.length > 0) {
      return this.api.sessions[0].userId;
    } else {
      return "";
    }
  }

  public static async getSubscriptions(): Promise<SubscriptionItem[]> {
    this.initialize();
    this.api = vscode.extensions.getExtension<AzureAccount>("ms-vscode.azure-account")!.exports;
    const subscriptionItems = this.loadSubscriptionItems();
    return subscriptionItems;
  }

  private static async loadSubscriptionItems(): Promise<SubscriptionItem[]> {
    await this.api.waitForFilters();
    const subscriptionItems: SubscriptionItem[] = [];
    const subscriptionIds: Map<string, boolean> = new Map();
    for (const session of this.api.sessions) {
      const credentials = session.credentials;
      const subscriptionClient = new SubscriptionClient(credentials);
      const subscriptions = await this.listAll(
        subscriptionClient.subscriptions,
        subscriptionClient.subscriptions.list()
      );
      for (const subscription of subscriptions) {
        if (subscription.subscriptionId && !subscriptionIds.has(subscription.subscriptionId)) {
          subscriptionIds.set(subscription.subscriptionId, true);
          subscriptionItems.push({
            label: subscription.displayName || "",
            subscriptionId: subscription.subscriptionId || "",
            session,
            subscription,
          });
        }
      }
    }
    subscriptionItems.sort((a, b) => a.label.localeCompare(b.label));
    return subscriptionItems;
  }

  public static async getAllResourceGroupItems(subscriptionItem: SubscriptionItem): Promise<ResourceGroupItem[]> {
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const resourceGroupItems: ResourceGroupItem[] = [];
    const resources = new ResourceManagementClient(session.credentials, subscription.subscriptionId!);
    const resourceGroups = await this.listAll(resources.resourceGroups, resources.resourceGroups.list());
    resourceGroups.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    resourceGroupItems.push(
      ...resourceGroups.map((resourceGroup) => {
        return {
          name: resourceGroup.name || "",
          location: resourceGroup.location,
          resourceGroup: resourceGroup,
        };
      })
    );
    return resourceGroupItems;
  }
  public static async getResourceGroupItem(
    resourceName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem> {
    return this.getAllResourceGroupItems(subscriptionItem).then((items) => {
      for (const resourceGroup of items) {
        if (resourceGroup.name === resourceName) {
          return resourceGroup;
        }
      }
      throw new ResourceGroupError(MESSAGES.ERRORS.RESOURCE_GROUP_NOT_FOUND);
    });
  }
  /*
   * Returns Intersection of two locationItem arrays a and b
   */
  private static locationItemIntersect(a: LocationItem[], b: LocationItem[]): LocationItem[] {
    const resultLocationItem: LocationItem[] = [];

    const aLocations: string[] = a.map((element) => element.locationDisplayName);
    const bLocations: string[] = b.map((element) => element.locationDisplayName);

    aLocations
      .filter((value) => bLocations.indexOf(value) !== -1)
      .map((location) => resultLocationItem.push({ locationDisplayName: location }));

    return resultLocationItem;
  }

  public static async getLocationsForCosmos(subscriptionItem: SubscriptionItem): Promise<LocationItem[]> {
    if (subscriptionItem === null || subscriptionItem === undefined) {
      return Promise.reject(MESSAGES.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }

    await this.initializeLocations(subscriptionItem);
    const azureResourceClient: ResourceManagementClient = new ResourceManagementClient(
      subscriptionItem.session.credentials,
      subscriptionItem.subscription.subscriptionId!
    );
    const cosmosLocations: LocationItem[] = [];

    const documentDBProvider = await azureResourceClient.providers.get(MICROSOFT_DOCUMENT_DB_PROVIDER);

    const databaseAccounts = documentDBProvider!.resourceTypes!.find((element) => {
      return element.resourceType === DOCUMENT_DB_RESOURCE_ACCOUNTS;
    });

    databaseAccounts!.locations!.forEach((element) => {
      cosmosLocations.push({ locationDisplayName: element });
    });

    cosmosLocations.sort((l1, l2) => l1.locationDisplayName!.localeCompare(l2.locationDisplayName!));

    return this.locationItemIntersect(cosmosLocations, this.locationsCache!);
  }

  // To get locations for Web App
  public static async getLocationsForApp(subscriptionItem: SubscriptionItem): Promise<LocationItem[]> {
    if (subscriptionItem === null || subscriptionItem === undefined) {
      return Promise.reject(MESSAGES.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }

    await this.initializeLocations(subscriptionItem);
    const azureResourceClient: ResourceManagementClient = new ResourceManagementClient(
      subscriptionItem.session.credentials,
      subscriptionItem.subscription.subscriptionId!
    );
    const locations: LocationItem[] = [];
    const webProvider = await azureResourceClient.providers.get(MICROSOFT_WEB_PROVIDER);

    const sites = webProvider!.resourceTypes!.find((element) => {
      return element.resourceType === WEB_RESOURCE_SITES;
    });

    sites!.locations!.forEach((element) => {
      locations.push({ locationDisplayName: element });
    });

    locations.sort((l1, l2) => l1.locationDisplayName!.localeCompare(l2.locationDisplayName!));

    return this.locationItemIntersect(locations, this.locationsCache!);
  }

  private static async initializeLocations(subscriptionItem: SubscriptionItem): Promise<void> {
    if (this.locationsCache !== undefined) {
      return;
    }
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const locationList: LocationItem[] = [];
    const subscriptionClient = new SubscriptionClient(
      session.credentials,
      session.environment.resourceManagerEndpointUrl
    );
    const locations: SubscriptionModels.LocationListResult = await subscriptionClient.subscriptions.listLocations(
      subscription.subscriptionId!
    );
    locations.sort((l1, l2) => l1.displayName!.localeCompare(l2.displayName!));
    locationList.push(
      ...locations.map((loc) => {
        return {
          locationDisplayName: loc.displayName || "",
        };
      })
    );
    this.locationsCache = locationList;
  }

  private static async listAll<T>(
    client: { listNext(nextPageLink: string): Promise<PartialList<T>> },
    first: Promise<PartialList<T>>
  ): Promise<T[]> {
    const all: T[] = [];
    for (
      let list = await first;
      list.length || list.nextLink;
      list = list.nextLink ? await client.listNext(list.nextLink) : []
    ) {
      all.push(...list);
    }
    return all;
  }
}
