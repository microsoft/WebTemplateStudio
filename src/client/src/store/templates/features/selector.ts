import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";
import { IOption } from "../../../types/option";
import { IOpenModalAction } from "../../navigation/modals/model";
import { FormattedMessage } from "react-intl";
import { openAppServiceModalAction, openCosmosDbModalAction } from "../../navigation/modals/action";
import messages from "./messages";

const getFeatures = (state: AppState) => state.templates.featureOptions;

const getServiceGroups = createSelector(getFeatures, (features) => {
  const result = features.reduce((result, feature) => {
    const service = getService(feature);
    const group = result.find((s) => s.name.description === service.group);
    if (group) {
      group.services.push(service);
    } else {
      const serviceGroupMetadata = getServiceGroupMetadata(service.group);
      result.push({
        name: serviceGroupMetadata.name,
        description: serviceGroupMetadata.description,
        services: [service],
      });
    }
    return result;
  }, new Array<IServiceGroup>());
  return result;
});

const getService = (option: IOption): IService => {
  const metadata = getServiceMetadata(option.internalName);
  return {
    ...option,
    group: option.group ? option.group : "none",
    openModalAction: metadata ? metadata.openModalAction : undefined,
    expectedPrice: metadata ? metadata.expectedPrice : undefined,
    expectedTime: metadata ? metadata.expectedTime : undefined,
  };
};

export interface IServiceGroup {
  name: FormattedMessage.MessageDescriptor;
  description: FormattedMessage.MessageDescriptor;
  services: IService[];
}

export type IService = IOption & {  
  openModalAction?: IOpenModalAction;
  expectedPrice?: FormattedMessage.MessageDescriptor;
  expectedTime?: FormattedMessage.MessageDescriptor;
};

export enum SERVICE_TYPE {
  APP_SERVICE = "wts.Feature.Azure.AppService",
  COSMOS_DB = "wts.Feature.Azure.Cosmos",
}

const getServiceMetadata = (serviceId: string) => {
  switch (serviceId) {
    case SERVICE_TYPE.APP_SERVICE:
      return {
        openModalAction: openAppServiceModalAction(),
        expectedPrice: messages.appServiceExpectedPrice,
        expectedTime: messages.appServiceExpectedTime,
      };
    case SERVICE_TYPE.COSMOS_DB:
      return {
        openModalAction: openCosmosDbModalAction(),
        expectedPrice: messages.cosmosDbExpectedPrice,
        expectedTime: messages.cosmosDbExpectedTime,
      };
    default:
      return undefined;
  }
};

enum SERVICES_GROUP {
  HOSTING = "CloudHosting",
  DATABASE = "CloudDatabase",
}

export const getServiceGroupMetadata = (groupName: string|undefined) => {
  switch (groupName) {
    case SERVICES_GROUP.HOSTING:
      return {
        name: messages.serviceGroupHostingName,
        description: messages.serviceGroupHostingDescription,
      };
    case SERVICES_GROUP.DATABASE:
      return {
        name: messages.serviceGroupStorageName,
        description: messages.serviceGroupStorageDescription,
      };
    default:
      return {
        name: messages.empty,
        description: messages.empty,
      };
  }
};

export { getServiceGroups };
