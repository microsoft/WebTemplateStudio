import { AZURE_TYPEKEYS } from "../typeKeys";

export interface IsLoggedIntoAzure {
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE;
}

export interface ILoginToAzure {
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE;
  payload: any;
}

export interface ILogout {
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE;
}