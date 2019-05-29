import { createSelector } from "reselect";
import { FormattedMessage } from "react-intl";

import { IServiceStatus } from "../reducers/generationStatus/genStatus";
import { isCosmosResourceCreatedSelector } from "./cosmosServiceSelector";
import { isAzureFunctionsSelectedSelector } from "./azureFunctionsServiceSelector";
import { AppState } from "../reducers";
import { messages } from "../mockData/azureServiceOptions";

const getGenerationStatusSelector = (state: AppState) =>
  state.generationStatus.genStatus;

const getSyncStatusSelector = (state: AppState): string =>
  state.generationStatus.statusMessage;

const isTemplateGenerated = (progressObject: IServiceStatus): boolean =>
  progressObject.templates.success;
const isTemplatesFailed = (progressObject: IServiceStatus): boolean =>
  progressObject.templates.failure;
const isCosmosDeployedSuccess = (progressObject: IServiceStatus): boolean =>
  progressObject.cosmos.success;
const isCosmosDeployedFailure = (progressObject: IServiceStatus): boolean =>
  progressObject.cosmos.failure;
const isAzureFunctionsDeployedSuccess = (
  progressObject: IServiceStatus
): boolean => progressObject.azureFunctions.success;
const isAzureFunctionsDeployedFailure = (
  progressObject: IServiceStatus
): boolean => progressObject.azureFunctions.failure;

const isCosmosDeployedSuccessSelector = createSelector(
  getGenerationStatusSelector,
  isCosmosDeployedSuccess
);

const isCosmosDeployedFailureSelector = createSelector(
  getGenerationStatusSelector,
  isCosmosDeployedFailure
);

const isAzureFunctionsDeployedSuccessSelector = createSelector(
  getGenerationStatusSelector,
  isAzureFunctionsDeployedSuccess
);

const isAzureFunctionsDeployedFailureSelector = createSelector(
  getGenerationStatusSelector,
  isAzureFunctionsDeployedFailure
);

const isTemplateGeneratedSelector = createSelector(
  getGenerationStatusSelector,
  isTemplateGenerated
);

const isTemplatesFailedSelector = createSelector(
  getGenerationStatusSelector,
  isTemplatesFailed
);

export interface IDeployStatus {
  title: FormattedMessage.MessageDescriptor;
  isSelected: boolean;
  isDeployed: boolean;
  isFailed: boolean;
}

export interface IAzureServiceStatus {
  [key: string]: IDeployStatus;
  cosmosdb: IDeployStatus;
  azureFunctions: IDeployStatus;
}

const servicesToDeploy = (
  isCosmosSelected: boolean,
  isCosmosSuccess: boolean,
  isCosmosFailure: boolean,
  isFunctionsSelected: boolean,
  isAzureFunctionsSuccess: boolean,
  isAzureFunctionsFailure: boolean
): IAzureServiceStatus => {
  return {
    cosmosdb: {
      title: messages.cosmosTitle,
      isSelected: isCosmosSelected,
      isDeployed: isCosmosSuccess,
      isFailed: isCosmosFailure
    },
    azureFunctions: {
      title: messages.azureFunctionsTitle,
      isSelected: isFunctionsSelected,
      isDeployed: isAzureFunctionsSuccess,
      isFailed: isAzureFunctionsFailure
    }
  };
};

const isServicesFailure = (
  isCosmosFailure: boolean,
  isFunctionsFailure: boolean
): boolean => isCosmosFailure && isFunctionsFailure;

const servicesToDeploySelector = createSelector(
  isCosmosResourceCreatedSelector,
  isCosmosDeployedSuccessSelector,
  isCosmosDeployedFailureSelector,
  isAzureFunctionsSelectedSelector,
  isAzureFunctionsDeployedSuccessSelector,
  isAzureFunctionsDeployedFailureSelector,
  servicesToDeploy
);

const isServicesFailureSelector = createSelector(
  isCosmosDeployedFailureSelector,
  isAzureFunctionsDeployedFailureSelector,
  isServicesFailure
);

const isServicesSelected = (
  isCosmosCreated: boolean,
  isFunctionsSelected: boolean
): boolean => isCosmosCreated || isFunctionsSelected;

const isServicesSelectedSelector = createSelector(
  isCosmosResourceCreatedSelector,
  isAzureFunctionsSelectedSelector,
  isServicesSelected
);

const isServicesDeployedOrFinished = (services: IAzureServiceStatus): boolean => {
  const { cosmosdb, azureFunctions } = services;
  let isFinished = true;
  if (cosmosdb.isSelected) {
    isFinished = isFinished && (cosmosdb.isDeployed || cosmosdb.isFailed);
  }
  if (azureFunctions.isSelected) {
    isFinished = isFinished && (azureFunctions.isDeployed || azureFunctions.isFailed);
  }
  return isFinished;
};

const isServicesDeployedOrFinishedSelector = createSelector(
  servicesToDeploySelector,
  isServicesDeployedOrFinished
);

export {
  getSyncStatusSelector,
  isTemplateGeneratedSelector,
  isServicesDeployedOrFinishedSelector,
  isServicesFailureSelector,
  isTemplatesFailedSelector,
  isServicesSelectedSelector,
  servicesToDeploySelector
};
