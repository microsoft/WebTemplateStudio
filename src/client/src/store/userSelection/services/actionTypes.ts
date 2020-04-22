import { ISaveAppServiceAction, IRemoveAppServiceAction } from "./appService/model";
import { ISaveCosmosDbAction, IRemoveCosmosDbAction } from "./cosmosDb/model";

type ServicesActionType =
  | ISaveAppServiceAction
  | IRemoveAppServiceAction  
  | ISaveCosmosDbAction
  | IRemoveCosmosDbAction;

export default ServicesActionType;
