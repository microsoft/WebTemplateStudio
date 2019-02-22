import * as vscode from 'vscode';
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
  MongoDB = 'MongoDB', //Mongo NoSQL
  Graph = 'Graph', //Gremlin
  Table = 'Table', //Azure Table
  DocumentDB = 'DocumentDB' //SQL
}

export namespace CosmosDBDeploy {

  export async function createCosmosDB(userCosmosDBSelection: CosmosDBSelections): Promise<DatabaseObject> {
    let userSubscriptionItem: SubscriptionItem = userCosmosDBSelection.subscriptionItem;
    let userCredentials: ServiceClientCredentials = userSubscriptionItem.session.credentials;
    if (userCosmosDBSelection.subscriptionItem === undefined || userCosmosDBSelection.subscriptionItem.subscription === undefined || userCosmosDBSelection.subscriptionItem.subscriptionId === undefined) {
      throw new SubscriptionError("CosmosDBDeploy: SubscriptionItem cannot have undefined values");
    }

    try {
      /*
      * Create Cosmos Client with users credentials and selected subscription *
      */
      var cosmosClient = new CosmosDBManagementClient(userCredentials, userSubscriptionItem.subscriptionId, userSubscriptionItem.session.environment.resourceManagerEndpointUrl);
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
      /*
      * Cosmos Client to generate a cosmos DB resource using resource group name, database name, and options *
      */
      var databaseAccount: DatabaseAccount = await cosmosClient.databaseAccounts.createOrUpdate(resourceGroup, dataBaseName, options);
      databaseAccount = await cosmosClient.databaseAccounts.get(resourceGroup, dataBaseName);

      var connectionString = await getConnectionString(cosmosClient, resourceGroup, dataBaseName);
    }
    catch (err) {
      throw new DeploymentError("CosmosDBDeploy: " + err.message);
    }

    /*
    * Returning a tuple which includes databaseAccount from callback and its connection string
    */
    var db: DatabaseObject = { databaseAccount, connectionString }
    return db;
  }

  async function getConnectionString(cosmosClient: CosmosDBManagementClient, resourceGroup: string, dataBaseName: string): Promise<string> {
    const result = await cosmosClient.databaseAccounts.listConnectionStrings(resourceGroup, dataBaseName);
    console.log(result!.connectionStrings![0].connectionString!);
    return result!.connectionStrings![0].connectionString!;
  }
}

export class CosmosDbModuleWrapper {
  // Account commands
  public static async createAccount() {
    return await vscode.commands.executeCommand("cosmosDB.createAccount");
  }

  public static async deleteAccount() {
    return await vscode.commands.executeCommand("cosmosDB.deleteAccount");
  }

  public static async copyConnectionString() {
    return await vscode.commands.executeCommand(
      "cosmosDB.copyConnectionString"
    );
  }

  public static async detachDatabaseAccount() {
    return await vscode.commands.executeCommand(
      "cosmosDB.detachDatabaseAccount"
    );
  }

  public static async attachDatabaseAccount() {
    return await vscode.commands.executeCommand(
      "cosmosDB.attachDatabaseAccount"
    );
  }

  // Mongo DB commands
  public static async createMongoDocument() {
    return await vscode.commands.executeCommand("cosmosDB.createMongoDocument");
  }

  public static async createMongoCollection() {
    return await vscode.commands.executeCommand(
      "cosmosDB.createMongoCollection"
    );
  }

  public static async executeMongoCommand() {
    return await vscode.commands.executeCommand("cosmosDB.executeMongoCommand");
  }

  public static async createMongoDatabase() {
    return await vscode.commands.executeCommand("cosmosDB.createMongoDatabase");
  }

  public static async connectMongoDB() {
    return await vscode.commands.executeCommand("cosmosDB.connectMongoDB");
  }

  public static async deleteMongoDB() {
    return await vscode.commands.executeCommand("cosmosDB.deleteMongoDB");
  }

  public static async deleteMongoCollection() {
    return await vscode.commands.executeCommand(
      "cosmosDB.deleteMongoCollection"
    );
  }

  public static async deleteMongoDocument() {
    return await vscode.commands.executeCommand("cosmosDB.deleteMongoDocument");
  }

  public static async executeAllMongoCommands() {
    return await vscode.commands.executeCommand(
      "cosmosDB.executeAllMongoCommands"
    );
  }

  public static async importDocument() {
    return await vscode.commands.executeCommand("cosmosDB.importDocument");
  }

  public static async openDocument() {
    return await vscode.commands.executeCommand("cosmosDB.openDocument");
  }

  public static async newMongoScrapbook() {
    return await vscode.commands.executeCommand("cosmosDB.newMongoScrapbook");
  }

  public static async launchMongoShell() {
    return await vscode.commands.executeCommand("cosmosDB.launchMongoShell");
  }

  // Doc DB commands

  public static async createDocDBStoredProcedure() {
    return await vscode.commands.executeCommand(
      "cosmosDB.createDocDBStoredProcedure"
    );
  }

  public static async createDocDBDocument() {
    return await vscode.commands.executeCommand("cosmosDB.createDocDBDocument");
  }

  public static async createDocDBCollection() {
    return await vscode.commands.executeCommand(
      "cosmosDB.createDocDBCollection"
    );
  }

  public static async createDocDBDatabase() {
    return await vscode.commands.executeCommand("cosmosDB.createDocDBDatabase");
  }

  public static async deleteDocDBDatabase() {
    return await vscode.commands.executeCommand("cosmosDB.deleteDocDBDatabase");
  }

  public static async deleteDocDBCollection() {
    return await vscode.commands.executeCommand(
      "cosmosDB.deleteDocDBCollection"
    );
  }

  public static async deleteDocDBDocument() {
    return await vscode.commands.executeCommand("cosmosDB.deleteDocDBDocument");
  }

  public static async openStoredProcedure() {
    return await vscode.commands.executeCommand("cosmosDB.openStoredProcedure");
  }

  // Graph commands

  public static async createGraphDatabase() {
    return await vscode.commands.executeCommand("cosmosDB.createGraphDatabase");
  }

  public static async createGraph() {
    return await vscode.commands.executeCommand("cosmosDB.createGraph");
  }

  public static async deleteGraphDatabase() {
    return await vscode.commands.executeCommand("cosmosDB.deleteGraphDatabase");
  }

  public static async deleteGraph() {
    return await vscode.commands.executeCommand("cosmosDB.deleteGraph");
  }

  public static async openGraphExplorer() {
    return await vscode.commands.executeCommand("cosmosDB.openGraphExplorer");
  }

  // other

  public static async openCollection() {
    return await vscode.commands.executeCommand("cosmosDB.openCollection");
  }

  public static async openInPortal() {
    await vscode.commands.executeCommand("cosmosDB.openInPortal");
  }

  public static async attachEmulator() {
    return await vscode.commands.executeCommand("cosmosDB.attachEmulator");
  }

  public static async loadMore() {
    return await vscode.commands.executeCommand("cosmosDB.loadMore");
  }

  public static async update() {
    return await vscode.commands.executeCommand("cosmosDB.update");
  }
}
