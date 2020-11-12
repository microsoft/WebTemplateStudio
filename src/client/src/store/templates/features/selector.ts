import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";
import { IOption } from "../../../types/option";
import { openAppServiceModalAction, openCosmosDbModalAction } from "../../navigation/modals/action";
import messages from "./messages";
import { SERVICE_GROUPS } from "../../../utils/constants/azure";
import { WIZARD_CONTENT_FEATURES } from "../../../utils/constants/internalNames";

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
    editable: option.editable
  };
};

const getServiceMetadata = (serviceId: string) => {
  switch (serviceId) {
    case WIZARD_CONTENT_FEATURES.APP_SERVICE:
      return {
        openModalAction: openAppServiceModalAction(),
        expectedPrice: messages.appServiceExpectedPrice,
        expectedTime: messages.appServiceExpectedTime,
      };
    case WIZARD_CONTENT_FEATURES.COSMOS_DB:
      return {
        openModalAction: openCosmosDbModalAction(),
        expectedPrice: messages.cosmosDbExpectedPrice,
        expectedTime: messages.cosmosDbExpectedTime,
      };
    default:
      return undefined;
  }
};

export const getServiceGroupMetadata = (groupName: string|undefined) => {
  switch (groupName) {
    case SERVICE_GROUPS.HOSTING:
      return {
        name: messages.serviceGroupHostingName,
        description: messages.serviceGroupHostingDescription,
      };
    case SERVICE_GROUPS.DATABASE:
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
