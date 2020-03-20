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
  ISetAppServiceSiteNameAvailability
} from "./setAccountAvailability";
import { IAzureValidationStatus } from "./setAzureValidationStatusAction";
import { IGetSubscription } from "./subscriptionData";

type AzureActionType =
  | IsLoggedIntoAzure
  | ILoginToAzure
  | ILogout
  | ISaveCosmosDbSettings
  | IRemoveCosmosDbSettings
  | ISaveAppServiceSettings
  | IRemoveAppServiceSettings
  | ISetCosmosAccountNameAvailability
  | ISetAppServiceSiteNameAvailability
  | IAzureValidationStatus
  | IGetSubscription;

export default AzureActionType;
