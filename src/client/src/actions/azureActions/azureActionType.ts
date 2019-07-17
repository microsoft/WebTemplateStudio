import {
  IUpdateFunctionNamesAction,
  ISaveAzureFunctionsSettings,
  IRemoveAzureFunction,
  IRemoveAzureFunctionApp
} from "./azureFunctionActions";
import { IsLoggedIntoAzure, ILoginToAzure } from "./logIntoAzure";
import { ILogout } from "./logOutAzure";
import {
  ISaveAppServiceSettings,
  IRemoveAppServiceSettings
} from "./appServiceActions";
import {
  ISaveCosmosDbSettings,
  IRemoveCosmosDbSettings
} from "./saveCosmosDbSettings";
import {
  ISetCosmosAccountNameAvailability,
  ISetAzureFunctionsAppNameAvailability,
  ISetAppServiceSiteNameAvailability
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
  | ISaveAppServiceSettings
  | IRemoveAppServiceSettings
  | ISetCosmosAccountNameAvailability
  | ISetAzureFunctionsAppNameAvailability
  | ISetAppServiceSiteNameAvailability
  | IAzureValidationStatus
  | IGetSubscription;

export default AzureActionType;
