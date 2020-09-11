import { CosmosDBManagementClient } from "azure-arm-cosmosdb";
import { DatabaseAccount } from "azure-arm-cosmosdb/lib/models";
import { ServiceClientCredentials } from "ms-rest";
import { SubscriptionItem, ResourceGroupItem } from "../azure-auth/azureAuth";
import * as path from "path";
import {
  SubscriptionError,
  AuthorizationError,
  DeploymentError
} from "../../errors";
import {
  ResourceManagementClient,
  ResourceManagementModels
} from "azure-arm-resource/lib/resource/resourceManagementClient";
import { ResourceManager } from "../azure-arm/resourceManager";
import { ARMFileHelper } from "../azure-arm/armFileHelper";
import { CONSTANTS } from "../../constants/constants";
import fs = require("fs-extra");
import { ConnectionString } from "../utils/connectionString";
import { Controller } from "../../controller";
import { MESSAGES } from "../../constants/messages";

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
 * Implemented API selections
 * value: the API which should be returned as selection
 * label: String to display to user
 */
export interface APIObject {
  value: API;
  label: string;
}

const COSMOS_DEPLOYMENT_SUFFIX = "-cosmos";

/*
 * Returns an array of available/implemented APIObjects for cosmos
 */
export function GetAvailableAPIs(): APIObject[] {
  return [
    {
      value: "MongoDB",
      label: "Azure Cosmos DB for MongoDB API"
    },
    {
      value: "Graph",
      label: "Gremlin (graph)"
    },
    {
      value: "Table",
      label: "Azure Table"
    },
    {
      value: "SQL",
      label: "Core (SQL)"
    },
    {
      value: "Cassandra",
      label: "Cassandra"
    }
  ];
}

/*
 * ARM template definitions for Cosmos APIs
 */
interface APIdefinition {
  readonly kind: string;
  readonly defaultExperience: string;
  readonly capabilities: any[];
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

    let userSubscriptionItem: SubscriptionItem;

    try {
      userSubscriptionItem = userCosmosDBSelection.subscriptionItem;
      this.setCosmosClient(userSubscriptionItem);
    } catch (error) {
      throw new AuthorizationError(error.message);
    }

    const resourceGroup = userCosmosDBSelection.resourceGroupItem.name;
    const databaseName = userCosmosDBSelection.cosmosDBResourceName;

    const location = userCosmosDBSelection.location;
    const experience = userCosmosDBSelection.cosmosAPI;

    const template = JSON.parse(
      fs.readFileSync(
        path.join(
          Controller.vsContext.extensionPath,
          "src",
          "azure",
          "azure-cosmosDB",
          "arm-templates",
          "template.json"
        ),
        "utf8"
      )
    );

    const parameters = JSON.parse(
      fs.readFileSync(
        path.join(
          Controller.vsContext.extensionPath,
          "src",
          "azure",
          "azure-cosmosDB",
          "arm-templates",
          "parameters.json"
        ),
        "utf8"
      )
    );

    const definitions: APIdefinition = this.APIdefinitionMap.get(experience)!;

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

    const deploymentParams = parameters.parameters;

    const options: ResourceManagementModels.Deployment = {
      properties: {
        mode: "Incremental",
        parameters: deploymentParams,
        template: template
      }
    };

    try {
      if (this.SubscriptionItemCosmosClient === undefined) {
        throw new AuthorizationError(
          MESSAGES.ERRORS.COSMOS_CLIENT_NOT_DEFINED
        );
      }

      const azureResourceClient: ResourceManagementClient = new ResourceManager().getResourceManagementClient(
        userSubscriptionItem
      );

      ARMFileHelper.createDirIfNonExistent(path.join(genPath, "arm-templates"));
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
        databaseName + COSMOS_DEPLOYMENT_SUFFIX,
        options
      );

      const databaseAccount: DatabaseAccount = await this.SubscriptionItemCosmosClient.databaseAccounts.get(
        resourceGroup,
        databaseName
      );

      const connectionString = await this.getConnectionString(
        this.SubscriptionItemCosmosClient,
        resourceGroup,
        databaseName
      );      

    /*
     * Returning a tuple which includes databaseAccount from callback and its connection string
     */
    const db: DatabaseObject = { databaseAccount, connectionString };
    return db;

    } catch (error) {
      throw new DeploymentError(error.message);
    }
  }

  /*
   * Set internal cosmos client using a user's selected subscription item
   */
  private setCosmosClient(userSubscriptionItem: SubscriptionItem): void {
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
    const userCredentials: ServiceClientCredentials =
      userSubscriptionItem.session.credentials;
    if (
      userSubscriptionItem === undefined ||
      userSubscriptionItem.subscription === undefined ||
      userSubscriptionItem.subscriptionId === undefined
    ) {
      throw new SubscriptionError(MESSAGES.ERRORS.SUBSCRIPTION_NOT_DEFINED);
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
    this.setCosmosClient(userSubscriptionItem);
    return await this.validateUniqueCosmosDBAccountName(name);
  }

  /*
   * Validating the given string name is unique
   * @return Return `undefined`, `null`, or the empty string when 'value' is valid and string message when 'value' is not valid.
   */
  private async validateUniqueCosmosDBAccountName(
    name: string
  ): Promise<string | undefined> {
    if (this.SubscriptionItemCosmosClient === undefined) {
      throw new AuthorizationError(MESSAGES.ERRORS.COSMOS_CLIENT_NOT_DEFINED);
    }
    name = name ? name.trim() : "";

    const min = CONSTANTS.COSMOS_DB_NAME.MIN_LENGTH;
    const max = CONSTANTS.COSMOS_DB_NAME.MAX_LENGTH;

    if (name.length < min || name.length > max) {
      return MESSAGES.ERRORS.NAME_MIN_MAX(min, max);
    } else if (name.match(/[^a-z0-9-]/)) {
      return MESSAGES.ERRORS.COSMOS_VALID_CHARACTERS;
    } else if (
      await this.SubscriptionItemCosmosClient.databaseAccounts.checkNameExists(
        name
      )
    ) {
      return MESSAGES.ERRORS.COSMOS_ACCOUNT_NOT_AVAILABLE(name);
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
      } catch (error) {
        throw new AuthorizationError(
          MESSAGES.ERRORS.CONNECTION_STRING_FAILED + error.message
        );
      }
    }

    const result = await cosmosClient.databaseAccounts.listConnectionStrings(
      resourceGroup,
      dataBaseName
    );
    return result!.connectionStrings![0].connectionString!;
  }

  public static updateConnectionStringInEnvFile(
    filePath: string,
    connectionString: string
  ): void {
    /**
     * Updates .env file in generated project directory once the connection string is received.
     * Throws an error if the user deleted the project directory
     * @filePath: path of .env file
     */
    const cosmosEnvironmentVariables = ConnectionString.parseConnectionString(
      connectionString
    );

    const envPath = path.join(filePath, "backend", ".env");
    try {
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(envPath, cosmosEnvironmentVariables);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  public static updateConnectionStringInAppSettingsFile(
    filePath: string,
    connectionString: string
  ): void {
    try {
      const appSettingsPath = path.join(filePath, "backend", "appsettings.json");
      const appsettings = fs.readJSONSync(appSettingsPath);

      if(ConnectionString.isCosmosSQLConnectionString(connectionString)) {
        const sqlData = ConnectionString.getConnectionStringSqlData(connectionString);
        appsettings.CosmosDB.Account = sqlData.account;
        appsettings.CosmosDB.Key = sqlData.primaryKey;
      } else {
        appsettings.ConnectionStrings.CosmosDB = connectionString;
      }

      fs.writeJSONSync(appSettingsPath, appsettings, {spaces: 2});

    } catch (err) {
      throw new Error(err);
    }
  }
}
