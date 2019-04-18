import {
  IUpdateFunctionNamesAction,
  ISaveAzureFunctionsSettings,
  IRemoveAzureFunction,
  IRemoveAzureFunctionApp
} from "./azureFunctionActions";
import { IsLoggedIntoAzure, ILoginToAzure } from "./logIntoAzure";
import { ILogout } from "./logOutAzure";
import {
  ISaveCosmosDbSettings,
  IRemoveCosmosDbSettings
} from "./saveCosmosDbSettings";
import {
  ISetCosmosAccountNameAvailability,
  ISetAzureFunctionsAppNameAvailability
} from "./setAccountAvailability";
import { IAzureValidationStatus } from "./setAzureValidationStatusAction";
import { IGetSubscription } from "./subscriptionData";

type AzureActionType =
  | IUpdateFunctionNamesAction
  | ISaveAzureFunctionsSettings
  | IRemoveAzureFunction
  | IRemoveAzureFunctionApp
  | IsLoggedIntoAzure
  | ILoginToAzure
  | ILogout
  | ISaveCosmosDbSettings
  | IRemoveCosmosDbSettings
  | ISetCosmosAccountNameAvailability
  | ISetAzureFunctionsAppNameAvailability
  | IAzureValidationStatus
  | IGetSubscription;

export default AzureActionType;
