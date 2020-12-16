import * as nls from "vscode-nls";

const localize: nls.LocalizeFunc = nls.config({
  messageFormat: nls.MessageFormat.file,
})();

export const MESSAGES = {
  ERRORS: {
    TOO_MANY_FAILED_SYNC_REQUESTS: (errorMessage: string): string => {
      return localize(
        "error.tooManyFailedSyncRequests",
        "Could not sync to template repository. Details: {0}",
        errorMessage
      );
    },
    INVALID_COMMAND: localize("error.invalidCommand", "Invalid command used"),
    INVALID_MODULE: localize("error.invalidModule", "Invalid module called"),
    RESOURCE_GROUP_NOT_FOUND: localize("error.resourceGroupNotFound", "No resource group found with this name"),
    CREATION_TRIES_EXCEEDED: (resourceType: string): string => {
      return localize("error.triesExceeded", "Number of tries exceeded for creating {0}", resourceType);
    },
    VALIDATION_TRIES_EXCEEDED: (resourceType: string): string => {
      return localize(
        "error.validationTriesExceeded",
        "Number of tries exceeded for validating {0} name",
        resourceType
      );
    },
    SUBSCRIPTION_NOT_FOUND: localize("error.subscriptionNotFound", "No subscription found with this name."),
    WEB_APP_NAME_NOT_AVAILABLE: (appName: string): string => {
      return localize("error.appNameNotAvailable", "Web app name {0} is not available", appName);
    },
    APP_SERVICE_UNDEFINED_ID: localize("error.appServiceUndefinedId", "Undefined App Service ID"),
    LOGOUT_FAILED: localize("error.loginTimeout", "Timeout. User is not logged in"),
    LOGIN_TIMEOUT: localize("error.loginTimeout", "Timeout. User is not logged in"),
    SESSION_NOT_AVAILABLE: localize(
      "error.sessionNotAvailable",
      "There is no session available. Make sure the user is logged in."
    ),
    SUBSCRIPTION_NOT_DEFINED: localize(
      "error.subscriptionNotDefined",
      "Subscription Item cannot have undefined values."
    ),
    AZURE_RESOURCE_CLIENT_NOT_DEFINED: localize(
      "error.azureResourceClientNotDefined",
      "Azure resource management client cannot be undefined"
    ),
    WEBSITE_CLIENT_NOT_DEFINED: localize(
      "error.websiteClientNotDefined",
      "Website management client cannot be undefined."
    ),
    COSMOS_CLIENT_NOT_DEFINED: localize("error.cosmosClientNotDefined", "Cosmos client cannot be undefined"),
    CONNECTION_STRING_FAILED: localize(
      "error.connectionStringFailed",
      "CosmosDBDeploy: GetConnectionString Failed to create Client with SubscriptionItem - "
    ),
    RUNTIME_NOT_IMPLEMENTED: localize("error.runtimeNotImplemented", "Runtime not implemented yet"),
    APP_INVALID_NAME: (name: string): string => {
      return localize(
        "error.appInvalidName",
        "Invalid name {0}. Name can only include alphanumeric characters and dashes, and must start/end with alphanumeric characters",
        name
      );
    },
    EMPTY_OUTPUT_PATH: localize("error.emptyOutputPath", "Output Path cannot be empty."),
    EMPTY_PROJECT_NAME: localize("error.emptyProjectName", "Project Name cannot be empty."),
    PROJECT_NAME_LENGTH_EXCEEDED_MAX: localize(
      "error.projectNameLengthExceededMax",
      "Project Name has to be less than 50 chars long."
    ),
    INVALID_OUTPUT_PATH: (path: string): string => {
      return localize("error.invalidOutputPath", "Path {0} does not exist.", path);
    },
    INVALID_PROJECT_NAME: (name: string): string => {
      return localize(
        "error.invalidProjectName",
        "{0} is invalid. The project name attribute may only contain letters, numbers, and spaces",
        name
      );
    },
    PATH_WITH_EMOJIS: (path: string): string => {
      return localize("error.pathWithEmojis", "{0} is invalid. Project Path cannot contain emojis", path);
    },
    PROJECT_PATH_EXISTS: (path: string, name: string): string => {
      return localize(
        "error.projectPathExists",
        "There exists a directory named {0} in the specified path '{1}', please choose a unique path",
        name,
        path
      );
    },
    COSMOS_ACCOUNT_NOT_AVAILABLE: (name: string): string => {
      return localize("error.cosmosAccountNotAvailable", 'Account name "{0}" is not available.', name);
    },
    COSMOS_VALID_CHARACTERS: localize(
      "error.cosmosValidCharacters",
      "The name can only contain lowercase letters, numbers, and the '-' character."
    ),
    NAME_MIN_MAX: (min: number, max: number): string => {
      return localize("error.nameMinMax", "The name must be between {0} and {1} characters.", min, max);
    },
    CANNOT_START_GENERATION_ENGINE: localize("error.cannotStartGenerationEngine", "Cannot start generation engine."),
    GENERATING_PROJECT: localize("error.generatingProject", "Error on generation project:"),
    CREATING_RESOURCE_GROUP: localize("error.creatingResourceGroup", "Error on Azure Resource Group creation:"),
    DEPLOY_AZURE_COSMOS_DB: localize("error.deployAzureCosmosDB", "Error on deploy CosmosDB Service:"),
    DEPLOY_AZURE_APP_SERVICE: localize("error.deployAzureAppService", "Error on deploy Azure App Service:"),
  },
  WARNINGS: {
    REACT_NATIVE_MISSING_PRERREQUISITES: localize(
      "error.reactNativeMissingPrerrequisites",
      "Warning: Please take into account that you are missing some prerequisites to work with react native."
    ),
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: (accountName: string): string => {
      return localize("info.cosmosAccountDeployed", "{0} has been deployed!", accountName);
    },
    APP_DEPLOYED: (appName: string): string => {
      return localize("info.appDeployed", "{1} App {0} has been deployed and is ready to use!", appName);
    },
    FILE_REPLACED_MESSAGE: localize("info.fileReplacedMessage", "Replaced file at: "),
    STARTING_GENERATION_SERVER: localize("info.startingServerMessage", "Starting Generation Server"),
    SYNC_STATUS: localize("info.syncStatus", "Sync Status: "),
  },
  DIALOG_RESPONSES: {
    yes: { title: localize("dialog.yes", "Yes") },
    no: { title: localize("dialog.no", "No") },
    cancel: { title: localize("dialog.cancel", "Cancel"), isCloseAffordance: true },
    deleteResponse: { title: localize("dialog.delete", "Delete") },
    learnMore: { title: localize("dialog.learnMore", "Learn more") },
    dontWarnAgain: { title: localize("dialog.dontWarnAgain", "Don't warn again") },
    skipForNow: { title: localize("dialog.skipForNow", "Skip for now") },
    reportAnIssue: { title: localize("dialog.reportAnIssue", "Report an issue") },
    showLog: { title: localize("dialog.showLog", "Show log") },
  },
  DIALOG_MESSAGES: {
    multiLineError: localize("dialog.multilineError", "An error has occured. Check output window for more details."),
    cosmosDBConnectStringReplacePrompt: localize(
      "dialog.cosmosDBConnectStringReplacePrompt",
      "Do you want to update the CosmosDB connection string in the configuration file?"
    ),
    resetPagesPrompt: localize("dialog.resetPagesPrompt", "Are you sure you want to reset all the selected pages?"),
    logoutPrompt: localize("dialog.logoutPrompt", "Are you sure you want to sign out of your Azure account?"),
  },
  GENERATION: {
    PROJECT_GENERATION_FINISHED: localize(
      "generation.projectGenerationFinished",
      "The project generation has finished successfully"
    ),
    TEMPLATES_COULD_NOT_BE_GENERATED: localize(
      "generation.templatesCouldNotBeGenerated",
      "ERROR: Templates could not be generated"
    ),
    SERVICE_DEPLOYMENT_HALTED: localize(
      "generation.serviceDeploymentHalted",
      "ERROR: Service deployment halted due to template error."
    ),
    DEPLOY_AZURE_SERVICE: localize(
      "generation.deployAzureService",
      "Deploying Azure services (this may take a few minutes)."
    ),
    COSMOS_FAILED_TO_DEPLOY: localize("generation.cosmosFailedToDeploy", "ERROR: Cosmos DB failed to deploy"),
    APPSERVICE_FAILED_TO_DEPLOY: localize("generation.appServiceFailedToDeploy", "ERROR: App Service failed to deploy"),
  },
};
