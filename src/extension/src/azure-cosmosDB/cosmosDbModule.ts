import { CosmosDBManagementClient } from "azure-arm-cosmosdb";
import { DatabaseAccount } from "azure-arm-cosmosdb/lib/models";
import { ServiceClientCredentials } from "ms-rest";
import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import * as fs from "fs";
import * as path from "path";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError
} from "../errors";
import {
  ResourceManagementClient,
  ResourceManagementModels
} from "azure-arm-resource/lib/resource/resourceManagementClient";
import { ResourceManager } from "../azure-arm/resourceManager";
import * as appRoot from "app-root-path";
import { ARMFileHelper } from "../azure-arm/armFileHelper";

import fs = require('fs');
import { CONSTANTS } from "../constants";
var Url = require('url-parse');

export interface CosmosDBSelections {
  cosmosDBResourceName: string;
  location: string;
  cosmosAPI: API;
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

/*
 * Azure Cosmos DB for Mongo API | Gremlin | Azure Table | Core (SQL) | Cassandra
 */
export type API = "MongoDB" | "Graph" | "Table" | "SQL" | "Cassandra";

/*
 * ARM template definitions for Cosmos APIs
 */
interface APIdefinition {
  readonly kind: string;
  readonly defaultExperience: string;
  readonly capabilities: Object[];
}

export class CosmosDBDeploy {
  /*
   * Map of Cosmos API type to its definitions for ARM templates
   */
  private APIdefinitionMap = new Map<API, APIdefinition>([
    [
      "MongoDB",
      {
        kind: "MongoDB",
        defaultExperience: "Azure Cosmos DB for MongoDB API",
        capabilities: []
      }
    ],
    [
      "Graph",
      {
        kind: "GlobalDocumentDB",
        defaultExperience: "Gremlin (graph)",
        capabilities: [{ name: "EnableGremlin" }]
      }
    ],
    [
      "Table",
      {
        kind: "GlobalDocumentDB",
        defaultExperience: "Azure Table",
        capabilities: [{ name: "EnableTable" }]
      }
    ],
    [
      "SQL",
      {
        kind: "GlobalDocumentDB",
        defaultExperience: "Core (SQL)",
        capabilities: []
      }
    ],
    [
      "Cassandra",
      {
        kind: "GlobalDocumentDB",
        defaultExperience: "Cassandra",
        capabilities: [{ name: "EnableCassandra" }]
      }
    ]
  ]);

  private SubscriptionItemCosmosClient: CosmosDBManagementClient | undefined;

  public async createCosmosDB(
    userCosmosDBSelection: CosmosDBSelections,
    genPath: string
  ): Promise<DatabaseObject> {
    /*
     * Create Cosmos Client with users credentials and selected subscription *
     */
    try {
      var userSubscriptionItem: SubscriptionItem =
        userCosmosDBSelection.subscriptionItem;
      this.setClientState(userSubscriptionItem);
    } catch (err) {
      throw new AuthorizationError("CosmosDBDeploy: " + err.message);
    }

    var resourceGroup = userCosmosDBSelection.resourceGroupItem.name;
    var databaseName = userCosmosDBSelection.cosmosDBResourceName;

    var location = userCosmosDBSelection.location;
    var experience = userCosmosDBSelection.cosmosAPI;

    let template = JSON.parse(
      fs.readFileSync(
        path.join(
          appRoot.toString(),
          "src",
          "azure-cosmosDB",
          "arm-templates",
          "template.json"
        ),
        "utf8"
      )
    );

    let parameters = JSON.parse(
      fs.readFileSync(
        path.join(
          appRoot.toString(),
          "src",
          "azure-cosmosDB",
          "arm-templates",
          "parameters.json"
        ),
        "utf8"
      )
    );

    let definitions: APIdefinition = this.APIdefinitionMap.get(experience)!;

    parameters.parameters = {
      name: {
        value: databaseName
      },
      location: {
        value: location
          .split(" ")
          .join("")
          .toLowerCase()
      },
      locationName: {
        value: location
      },
      defaultExperience: {
        value: definitions.defaultExperience
      },
      capabilities: {
        value: definitions.capabilities
      },
      kind: {
        value: definitions.kind
      }
    };

    let deploymentParams = parameters.parameters;

    var options: ResourceManagementModels.Deployment = {
      properties: {
        mode: "Incremental",
        parameters: deploymentParams,
        template: template
      }
    };

    try {
      if (this.SubscriptionItemCosmosClient === undefined) {
        throw new AuthorizationError("Cosmos Client cannot be undefined.");
      }

      let azureResourceClient: ResourceManagementClient = new ResourceManager().getResourceManagementClient(
        userSubscriptionItem
      );

      ARMFileHelper.createOrOverwriteDir(path.join(genPath, "arm-templates"));
      ARMFileHelper.writeObjectToJsonFile(
        path.join(genPath, "arm-templates", "cosmos-template.json"),
        template
      );
      ARMFileHelper.writeObjectToJsonFile(
        path.join(genPath, "arm-templates", "cosmos-parameters.json"),
        parameters
      );

      /*
       * Cosmos Client to generate a cosmos DB resource using resource group name, database name, and options *
       */
      await azureResourceClient.deployments.createOrUpdate(
        resourceGroup,
        databaseName,
        options
      );

      var databaseAccount: DatabaseAccount = await this.SubscriptionItemCosmosClient.databaseAccounts.get(
        resourceGroup,
        databaseName
      );

      var connectionString = await this.getConnectionString(
        this.SubscriptionItemCosmosClient,
        resourceGroup,
        databaseName
      );
    } catch (err) {
      throw new DeploymentError("CosmosDBDeploy: " + err.message);
    }

    /*
     * Returning a tuple which includes databaseAccount from callback and its connection string
     */
    var db: DatabaseObject = { databaseAccount, connectionString };
    return db;
  }

  private setClientState(userSubscriptionItem: SubscriptionItem): void {
    if (
      this.SubscriptionItemCosmosClient === undefined ||
      this.SubscriptionItemCosmosClient.subscriptionId !==
        userSubscriptionItem.subscriptionId
    ) {
      this.SubscriptionItemCosmosClient = this.createCosmosClient(
        userSubscriptionItem
      );
    }
  }

  private createCosmosClient(
    userSubscriptionItem: SubscriptionItem
  ): CosmosDBManagementClient {
    let userCredentials: ServiceClientCredentials =
      userSubscriptionItem.session.credentials;
    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(
        "SubscriptionItem cannot have undefined values"
      );
    }
    return new CosmosDBManagementClient(
      userCredentials,
      userSubscriptionItem.subscriptionId,
      userSubscriptionItem.session.environment.resourceManagerEndpointUrl
    );
  }

  /*
   * Validating the given string name is unique
   * @return Return `undefined`, `null`, or the empty string when 'value' is valid and string message when 'value' is not valid.
   */
  public async validateCosmosDBAccountName(
    name: string,
    userSubscriptionItem: SubscriptionItem
  ): Promise<string | undefined> {
    this.setClientState(userSubscriptionItem);
    return await this.validateUniqueCosmosDBAccountName(name);
  }

  /*
   * Validating the given string name is unique
   * @return Return `undefined`, `null`, or the empty string when 'value' is valid and string message when 'value' is not valid.
   */
  private async validateUniqueCosmosDBAccountName(
    name: string
  ): Promise<string | undefined> {
    // let client: CosmosDBManagementClient = this.createCosmosClient(userSubscriptionItem);
    if (this.SubscriptionItemCosmosClient === undefined) {
      throw new AuthorizationError("Cosmos Client cannot be undefined.");
    }
    name = name ? name.trim() : "";

    const min = 3;
    const max = 31;

    if (name.length < min || name.length > max) {
      return `The name must be between ${min} and ${max} characters.`;
    } else if (name.match(/[^a-z0-9-]/)) {
      return "The name can only contain lowercase letters, numbers, and the '-' character.";
    } else if (
      await this.SubscriptionItemCosmosClient.databaseAccounts.checkNameExists(
        name
      )
    ) {
      return `Account name "${name}" is not available.`;
    } else {
      return undefined;
    }
  }

  /*
   * Returns Azure Cosmos DB connection string for user's deployed database instance.
   * This is what the user will use to connect to the database.
   *
   * Overload on getConnectionString; one for providing creating the Cosmos Client
   */
  public async getConnectionString(
    userSubscriptionItem: SubscriptionItem,
    resourceGroup: string,
    dataBaseName: string
  ): Promise<string>;
  public async getConnectionString(
    cosmosDBManagementClient: CosmosDBManagementClient,
    resourceGroup: string,
    dataBaseName: string
  ): Promise<string>;
  public async getConnectionString(
    cosmosClientOrSubscriptionItem: CosmosDBManagementClient | SubscriptionItem,
    resourceGroup: string,
    dataBaseName: string
  ): Promise<string> {
    let cosmosClient: CosmosDBManagementClient;
    if (cosmosClientOrSubscriptionItem instanceof CosmosDBManagementClient) {
      cosmosClient = cosmosClientOrSubscriptionItem;
    } else {
      try {
        cosmosClient = this.createCosmosClient(cosmosClientOrSubscriptionItem);
      } catch (err) {
        throw new AuthorizationError(
          "CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - " +
          err.message
        );
      }
    }

    const result = await cosmosClient.databaseAccounts.listConnectionStrings(
      resourceGroup,
      dataBaseName
    );
    return result!.connectionStrings![0].connectionString!;
  }

  public static updateConnectionStringInEnvFile(filePath: string, connectionString: string): void {
    /**
     * Updates .env file in generated project directory once the connection string is received.
     * Throws an error if the user deleted the project directory
     * @filePath: path of .env file
     */
    const cosmosConnectionString = Url(connectionString);
    const envContent = CONSTANTS.ENV(cosmosConnectionString.username, cosmosConnectionString.password, cosmosConnectionString.origin);
    const path = filePath + "\\.env";
    try {
      if (fs.existsSync(filePath)) {
        // file exists
        fs.writeFileSync(path, envContent);
      }
    }
    catch (err) {
      throw new Error(err);
    }
  }
}
