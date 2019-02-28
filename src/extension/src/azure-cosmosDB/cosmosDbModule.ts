import { CosmosDBManagementClient } from 'azure-arm-cosmosdb';
import { DatabaseAccount } from 'azure-arm-cosmosdb/lib/models';
import { ServiceClientCredentials } from 'ms-rest';
import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import { SubscriptionError, AuthorizationError, DeploymentError } from '../errors';

export interface CosmosDBSelections {
  cosmosDBResourceName: string;
  location: string;
  cosmosAPI: API;
  tags: Object;
  subscriptionItem: SubscriptionItem;
  resourceGroupItem: ResourceGroupItem;
}

/*
 * Database Object - tuple to return to caller
 */
export interface DatabaseObject {
  databaseAccount: DatabaseAccount;
  connectionString: string;
}

export enum API {
  MongoDB = 'MongoDB', // Mongo NoSQL
  Graph = 'Graph', // Gremlin
  Table = 'Table', // Azure Table
  DocumentDB = 'DocumentDB' // SQL
}

export class CosmosDBDeploy {

  private SubscriptionItemCosmosClient: CosmosDBManagementClient | undefined = undefined;

  public async createCosmosDB(userCosmosDBSelection: CosmosDBSelections): Promise<DatabaseObject> {
    /*
      * Create Cosmos Client with users credentials and selected subscription *
      */
    try {
      var userSubscriptionItem: SubscriptionItem = userCosmosDBSelection.subscriptionItem;
      this.setClientState(userSubscriptionItem);
    }
    catch (err) {
      throw new AuthorizationError("CosmosDBDeploy: " + err.message);
    }

    var resourceGroup = userCosmosDBSelection.resourceGroupItem.name;
    var dataBaseName = userCosmosDBSelection.cosmosDBResourceName;

    var location = userCosmosDBSelection.location;
    var experience = userCosmosDBSelection.cosmosAPI;
    var tagObject = userCosmosDBSelection.tags;

    var options = {
      location: location,
      locations: [{ locationName: location }],
      kind: experience,
      tag: tagObject, // sample: { defaultExperience: "Azure Cosmos DB for MongoDB API", BuildOrigin : "Project Acorn"},
      capabilities: []
    };

    try {
      if (this.SubscriptionItemCosmosClient === undefined) {
        throw new AuthorizationError("Cosmos Client cannot be undefined.");
      }
      /*
      * Cosmos Client to generate a cosmos DB resource using resource group name, database name, and options *
      */
      var databaseAccount: DatabaseAccount = await this.SubscriptionItemCosmosClient.databaseAccounts.createOrUpdate(resourceGroup, dataBaseName, options);
      databaseAccount = await this.SubscriptionItemCosmosClient.databaseAccounts.get(resourceGroup, dataBaseName);

      var connectionString = await this.getConnectionString(this.SubscriptionItemCosmosClient, resourceGroup, dataBaseName);
    }
    catch (err) {
      throw new DeploymentError("CosmosDBDeploy: " + err.message);
    }

    /*
    * Returning a tuple which includes databaseAccount from callback and its connection string
    */
    var db: DatabaseObject = { databaseAccount, connectionString };
    return db;
  }

  private setClientState(userSubscriptionItem: SubscriptionItem): void {
    if (this.SubscriptionItemCosmosClient === undefined) {
      this.SubscriptionItemCosmosClient = this.createCosmosClient(userSubscriptionItem);
    }
    else if (this.SubscriptionItemCosmosClient.subscriptionId !== userSubscriptionItem.subscriptionId) {
      this.SubscriptionItemCosmosClient = this.createCosmosClient(userSubscriptionItem);
    }
  }

  private createCosmosClient(userSubscriptionItem: SubscriptionItem): CosmosDBManagementClient {

    let userCredentials: ServiceClientCredentials = userSubscriptionItem.session.credentials;
    if (userSubscriptionItem === undefined || userSubscriptionItem.subscription === undefined || userSubscriptionItem.subscriptionId === undefined) {
      throw new SubscriptionError("SubscriptionItem cannot have undefined values");
    }
    return new CosmosDBManagementClient(userCredentials, userSubscriptionItem.subscriptionId, userSubscriptionItem.session.environment.resourceManagerEndpointUrl);
  }

  /*
  * Validating the given string name is unique
  * @return Return `undefined`, `null`, or the empty string when 'value' is valid and string message when 'value' is not valid.
  */
  public async validateCosmosDBAccountName(name: string, userSubscriptionItem: SubscriptionItem): Promise<string | undefined> {
    this.setClientState(userSubscriptionItem);
    return await this.validateUniqueCosmosDBAccountName(name);
  }

  /*
  * Validating the given string name is unique
  * @return Return `undefined`, `null`, or the empty string when 'value' is valid and string message when 'value' is not valid.
  */
  private async validateUniqueCosmosDBAccountName(name: string): Promise<string | undefined> {

    // let client: CosmosDBManagementClient = this.createCosmosClient(userSubscriptionItem);
    if (this.SubscriptionItemCosmosClient === undefined) {
      throw new AuthorizationError("Cosmos Client cannot be undefined.");
    }
    name = name ? name.trim() : '';

    const min = 3;
    const max = 31;

    if (name.length < min || name.length > max) {
      return `The name must be between ${min} and ${max} characters.`;
    } else if (name.match(/[^a-z0-9-]/)) {
      return "The name can only contain lowercase letters, numbers, and the '-' character.";
    } else if (await this.SubscriptionItemCosmosClient.databaseAccounts.checkNameExists(name)) {
      return `Account name "${name}" is not available.`;
    } else {

      return undefined;
    }
  }

  /*
  * Overload on getConnectionString; one for providing creating the Cosmos Client
  * 
  */
  public async getConnectionString(userSubscriptionItem: SubscriptionItem, resourceGroup: string, dataBaseName: string): Promise<string>;
  public async getConnectionString(cosmosDBManagementClient: CosmosDBManagementClient, resourceGroup: string, dataBaseName: string): Promise<string>;
  public async getConnectionString(cosmosClientOrSubscriptionItem: CosmosDBManagementClient | SubscriptionItem, resourceGroup: string, dataBaseName: string): Promise<string> {
    let cosmosClient: CosmosDBManagementClient;
    if (cosmosClientOrSubscriptionItem instanceof CosmosDBManagementClient) {
      cosmosClient = cosmosClientOrSubscriptionItem;
    }
    else {
      try {
        cosmosClient = this.createCosmosClient(cosmosClientOrSubscriptionItem);
      }
      catch (err) {
        throw new AuthorizationError("CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - " + err.message);
      }
    }

    const result = await cosmosClient.databaseAccounts.listConnectionStrings(resourceGroup, dataBaseName);
    console.log(result!.connectionStrings![0].connectionString!);
    return result!.connectionStrings![0].connectionString!;
  }
}
