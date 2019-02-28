import { AzureAccount, AzureSession } from "./azure-account.api"; // Other extensions need to copy this .d.ts to their repository.
import { extensions, commands } from "vscode";
import { SubscriptionModels } from "azure-arm-resource";
import { SubscriptionClient } from "../../node_modules/azure-arm-resource/lib/subscription/subscriptionClient";
import { ResourceManagementClient } from "../../node_modules/azure-arm-resource/lib/resource/resourceManagementClient";
import { AuthorizationError } from "../errors";

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

  private static async initialize() {
    /**
     * Initializes the AzureAccount object if not initialized.
     * Will get called whenever a function that uses AzureAccount object is called
     */
    if (this.api === undefined) {
      this.api = extensions.getExtension<AzureAccount>(
        "ms-vscode.azure-account"
      )!.exports;
    }
  }

  public static async login(): Promise<Boolean> {
    this.initialize();
    if (this.api.status !== "LoggedIn") {
      await commands.executeCommand("azure-account.login");
      // Make sure it did not return from timeout
      if (this.api.status === "LoggingIn") {
        throw new AuthorizationError("Timeout. User is not logged in");
      }
      return true;
    } else {
      return true;
    }
  }

  public static getEmail(): string {
    this.initialize();
    if (this.api.sessions.length > 0) {
      return this.api.sessions[0].userId;
    } else {
      throw new AuthorizationError(
        "There is no session available. Make sure the user is logged in."
      );
    }
  }

  public static async getSubscriptions(): Promise<SubscriptionItem[]> {
    this.initialize();
    this.api = extensions.getExtension<AzureAccount>(
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
      const subscriptionClient = new SubscriptionClient(credentials);
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

  public static async getResourceGroupItems(
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem[]> {
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const resourceGroupItems: ResourceGroupItem[] = [];
    const resources = new ResourceManagementClient(
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

  public static async getLocations(
    subscriptionItem: SubscriptionItem
  ): Promise<LocationItem[]> {
    this.initialize();
    const { session, subscription } = subscriptionItem;
    const locationList: LocationItem[] = [];
    const subscriptionClient = new SubscriptionClient(
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
    return locationList;
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
