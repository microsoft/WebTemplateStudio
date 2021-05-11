import { IRemoveAppServiceAction, ISaveAppServiceAction } from "./appService/model";
import { IRemoveCosmosDbAction, ISaveCosmosDbAction } from "./cosmosDb/model";

type ServicesActionType = ISaveAppServiceAction | IRemoveAppServiceAction | ISaveCosmosDbAction | IRemoveCosmosDbAction;

export default ServicesActionType;
