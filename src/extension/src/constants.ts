import { MessageItem } from 'vscode';
import * as nls from 'vscode-nls';

export const CONSTANTS = {
  ERRORS: {
    INVALID_COMMAND: "Invalid command used",
    RESOURCE_GROUP_NOT_FOUND: "No resource group found with this name",
    SUBSCRIPTION_NOT_FOUND: "No subscription found with this name.",
    FUNCTION_APP_NAME_NOT_AVAILABLE: function (functionName: string) {
      return `Function app name ${functionName} is not available`;
    },
    LOGIN_TIMEOUT: "Timeout. User is not logged in",
    SESSION_NOT_AVAILABLE:
      "There is no session available. Make sure the user is logged in."
  },
  INFO: {
    COSMOS_ACCOUNT_DEPLOYED: function (accountName: string) {
      return `${accountName} has been deployed!`;
    }
  },
  AZURE_LOGIN_STATUS: {
    LOGGED_IN: "LoggedIn",
    LOGGING_IN: "LoggingIn",
    INITIALIZING: "Initializing",
    LOGGED_OUT: "LoggedOut"
  },
  REACT_PANEL: {
    Project_Title: "Project Acorn"
  },
  GENERATE_ENDPOINT: "/api/generate"
};

export enum ExtensionCommand {
  Login = "login",
  Subscriptions = "subscriptions",
  SubscriptionData = "subscriptionData",
  NameFunctions = "name-functions",
  NameCosmos = "name-cosmos",
  DeployFunctions = "deploy-functions",
  DeployCosmos = "deploy-cosmos",
  Generate = "generate",
  GetOutputPath = "getOutputPath",
  HandleTelemetry = "telemetryAI"
}

const localize: nls.LocalizeFunc = nls.loadMessageBundle();
export namespace DialogResponses {
  export const yes: MessageItem = { title: localize('yes', 'Yes') };
  export const no: MessageItem = { title: localize('no', 'No') };
  export const cancel: MessageItem = { title: localize('cancel', 'Cancel'), isCloseAffordance: true };
  export const deleteResponse: MessageItem = { title: localize('delete', 'Delete') };
  export const learnMore: MessageItem = { title: localize('learnMore', 'Learn more') };
  export const dontWarnAgain: MessageItem = { title: localize('dontWarnAgain', 'Don\'t warn again') };
  export const skipForNow: MessageItem = { title: localize('skipForNow', 'Skip for now') };
  export const reportAnIssue: MessageItem = { title: localize('reportAnIssue', "Report an issue") };
  }
export namespace DialogMessages{
  export const multiLineError: string = localize('multilineError', 'An error has occured. Check output window for more details.');
}