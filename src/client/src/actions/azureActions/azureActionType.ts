import { IsLoggedIntoAzure, ILoginToAzure } from "./logIntoAzure";
import { ILogout } from "./logOutAzure";
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
import { ISaveAppServiceSettings, IRemoveAppServiceSettings } from "../../store/azure/appService/model";

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
