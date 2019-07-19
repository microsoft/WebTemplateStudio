import { AzureAccount, AzureSession } from "./azure-account.api"; // Other extensions need to copy this .d.ts to their repository.
import * as vscode from "vscode";
import {
  SubscriptionModels,
  SubscriptionClient as SC,
  ResourceManagementClient as RMC
} from "azure-arm-resource";
import { AuthorizationError, ResourceGroupError } from "../../errors";
import { CONSTANTS, DialogMessages, DialogResponses } from "../../constants";

const MICROSOFT_DOCUMENT_DB_PROVIDER: string = "Microsoft.DocumentDb";
const MICROSOFT_WEB_PROVIDER: string = "Microsoft.Web";

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

  private static async initialize() {
    /**
     * Initializes the AzureAccount object if not initialized.
     * Will get called whenever a function that uses AzureAccount object is called
     */
    if (this.api === undefined) {
      this.api = vscode.extensions.getExtension<AzureAccount>(
        "ms-vscode.azure-account"
      )!.exports;
    }
  }

  public static async promptUsersToLogout() {
    return await vscode.window
      .showInformationMessage(
        DialogMessages.logoutPrompt,
        ...[DialogResponses.yes, DialogResponses.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        let userConfirmation = {
          signOut: false
        };
        if (selection === DialogResponses.yes) {
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
        throw new AuthorizationError(CONSTANTS.ERRORS.LOGIN_TIMEOUT);
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
        throw new AuthorizationError(CONSTANTS.ERRORS.LOGOUT_FAILED);
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
    this.api = vscode.extensions.getExtension<AzureAccount>(
      "ms-vscode.azure-account"
    )!.exports;
    const subscriptionItems = this.loadSubscriptionItems();
    return subscriptionItems;
  }

  private static async loadSubscriptionItems(): Promise<SubscriptionItem[]> {
    await this.api.waitForFilters();
    const subscriptionItems: SubscriptionItem[] = [];
    for (const session of this.api.sessions) {
      const credentials = session.credentials;
      const subscriptionClient = new SC.SubscriptionClient(credentials);
      const subscriptions = await this.listAll(
        subscriptionClient.subscriptions,
        subscriptionClient.subscriptions.list()
      );
      subscriptionItems.push(
        ...subscriptions.map(subscription => ({
          label: subscription.displayName || "",
          subscriptionId: subscription.subscriptionId || "",
          session,
          subscription
        }))
      );
    }
    subscriptionItems.sort((a, b) => a.label.localeCompare(b.label));
    return subscriptionItems;
  }

  public static async getAllResourceGroupItems(
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem[]> {
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const resourceGroupItems: ResourceGroupItem[] = [];
    const resources = new RMC.ResourceManagementClient(
      session.credentials,
      subscription.subscriptionId!
    );
    const resourceGroups = await this.listAll(
      resources.resourceGroups,
      resources.resourceGroups.list()
    );
    resourceGroups.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    resourceGroupItems.push(
      ...resourceGroups.map(resourceGroup => {
        return {
          name: resourceGroup.name || "",
          location: resourceGroup.location,
          resourceGroup: resourceGroup
        };
      })
    );
    return resourceGroupItems;
  }
  public static async getResourceGroupItem(
    resourceName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem> {
    return this.getAllResourceGroupItems(subscriptionItem).then(items => {
      for (let resourceGroup of items) {
        if (resourceGroup.name === resourceName) {
          return resourceGroup;
        }
      }
      throw new ResourceGroupError(CONSTANTS.ERRORS.RESOURCE_GROUP_NOT_FOUND);
    });
  }
  /*
   * Returns Intersection of two locationItem arrays a and b
   */
  private static locationItemIntersect(
    a: LocationItem[],
    b: LocationItem[]
  ): LocationItem[] {
    let resultLocationItem: LocationItem[] = [];

    let aLocations: string[] = a.map(element => element.locationDisplayName);
    let bLocations: string[] = b.map(element => element.locationDisplayName);

    aLocations
      .filter(value => bLocations.indexOf(value) !== -1)
      .map(location =>
        resultLocationItem.push({ locationDisplayName: location })
      );

    return resultLocationItem;
  }

  public static async getLocationsForCosmos(
    subscriptionItem: SubscriptionItem
  ): Promise<LocationItem[]> {
    if (subscriptionItem === null || subscriptionItem === undefined) {
      return Promise.reject(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }

    await this.initializeLocations(subscriptionItem);
    let azureResourceClient: RMC.ResourceManagementClient = new RMC.ResourceManagementClient(
      subscriptionItem.session.credentials,
      subscriptionItem.subscription.subscriptionId!
    );
    let cosmosLocations: LocationItem[] = [];

    let documentDBProvider = await azureResourceClient.providers.get(
      MICROSOFT_DOCUMENT_DB_PROVIDER
    );

    let databaseAccounts = documentDBProvider!.resourceTypes!.find(element => {
      return element.resourceType === DOCUMENT_DB_RESOURCE_ACCOUNTS;
    });

    databaseAccounts!.locations!.forEach(element => {
      cosmosLocations.push({ locationDisplayName: element });
    });

    cosmosLocations.sort((l1, l2) =>
      l1.locationDisplayName!.localeCompare(l2.locationDisplayName!)
    );

    return this.locationItemIntersect(cosmosLocations, this.locationsCache!);
  }

  // To get locations for Function App and Web App
  public static async getLocationsForApp(
    subscriptionItem: SubscriptionItem
  ): Promise<LocationItem[]> {
    if (subscriptionItem === null || subscriptionItem === undefined) {
      return Promise.reject(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_DEFINED);
    }

    await this.initializeLocations(subscriptionItem);
    let azureResourceClient: RMC.ResourceManagementClient = new RMC.ResourceManagementClient(
      subscriptionItem.session.credentials,
      subscriptionItem.subscription.subscriptionId!
    );
    let functionsLocations: LocationItem[] = [];
    let webProvider = await azureResourceClient.providers.get(
      MICROSOFT_WEB_PROVIDER
    );

    let sites = webProvider!.resourceTypes!.find(element => {
      return element.resourceType === WEB_RESOURCE_SITES;
    });

    sites!.locations!.forEach(element => {
      functionsLocations.push({ locationDisplayName: element });
    });

    functionsLocations.sort((l1, l2) =>
      l1.locationDisplayName!.localeCompare(l2.locationDisplayName!)
    );

    return this.locationItemIntersect(functionsLocations, this.locationsCache!);
  }

  private static async initializeLocations(
    subscriptionItem: SubscriptionItem
  ): Promise<void> {
    if (this.locationsCache !== undefined) {
      return;
    }
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const locationList: LocationItem[] = [];
    const subscriptionClient = new SC.SubscriptionClient(
      session.credentials,
      session.environment.resourceManagerEndpointUrl
    );
    let locations: SubscriptionModels.LocationListResult = await subscriptionClient.subscriptions.listLocations(
      subscription.subscriptionId!
    );
    locations.sort((l1, l2) => l1.displayName!.localeCompare(l2.displayName!));
    locationList.push(
      ...locations.map(loc => {
        return {
          locationDisplayName: loc.displayName || ""
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
