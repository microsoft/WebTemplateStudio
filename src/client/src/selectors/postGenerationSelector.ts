import { createSelector } from "reselect";
import { FormattedMessage } from "react-intl";

import { IServiceStatus } from "../reducers/generationStatus/genStatus";
import { isCosmosResourceCreatedSelector } from "./cosmosServiceSelector";
import { isAzureFunctionsSelectedSelector } from "./azureFunctionsServiceSelector";
import { isAppServiceSelectedSelector } from "./appServiceSelector";
import { AppState } from "../reducers";
import { azureMessages } from "../mockData/azureServiceOptions";

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
const isAppServiceCreatedSuccess = (progressObject: IServiceStatus): boolean =>
  progressObject.appService && progressObject.appService.success;
const isAppServiceCreatedFailure = (progressObject: IServiceStatus): boolean =>
  progressObject.appService && progressObject.appService.failure;

const isAppServiceCreatedSuccessSelector = createSelector(
  getGenerationStatusSelector,
  isAppServiceCreatedSuccess
);

const isAppServiceCreatedFailureSelector = createSelector(
  getGenerationStatusSelector,
  isAppServiceCreatedFailure
);

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
  isAzureFunctionsFailure: boolean,
  isAppServiceSelected: boolean,
  isAppServiceSuccess: boolean,
  isAppServiceFailure: boolean
): IAzureServiceStatus => {
  return {
    cosmosdb: {
      title: azureMessages.cosmosTitle,
      isSelected: isCosmosSelected,
      isDeployed: isCosmosSuccess,
      isFailed: isCosmosFailure
    },
    azureFunctions: {
      title: azureMessages.azureFunctionsTitle,
      isSelected: isFunctionsSelected,
      isDeployed: isAzureFunctionsSuccess,
      isFailed: isAzureFunctionsFailure
    },
    appService: {
      title: azureMessages.appServiceTitle,
      isSelected: isAppServiceSelected,
      isDeployed: isAppServiceSuccess,
      isFailed: isAppServiceFailure
    }
  };
};

const isServicesFailure = (
  isCosmosFailure: boolean,
  isFunctionsFailure: boolean,
  isAppServiceFailure: boolean
): boolean => isCosmosFailure && isFunctionsFailure;

const servicesToDeploySelector = createSelector(
  isCosmosResourceCreatedSelector,
  isCosmosDeployedSuccessSelector,
  isCosmosDeployedFailureSelector,
  isAzureFunctionsSelectedSelector,
  isAzureFunctionsDeployedSuccessSelector,
  isAzureFunctionsDeployedFailureSelector,
  isAppServiceSelectedSelector,
  isAppServiceCreatedSuccessSelector,
  isAppServiceCreatedFailureSelector,
  servicesToDeploy
);

const isServicesFailureSelector = createSelector(
  isCosmosDeployedFailureSelector,
  isAzureFunctionsDeployedFailureSelector,
  isAppServiceCreatedFailureSelector,
  isServicesFailure
);

const isServicesSelected = (
  isCosmosCreated: boolean,
  isFunctionsSelected: boolean,
  isAppServiceSelected: boolean
): boolean => isCosmosCreated || isFunctionsSelected || isAppServiceSelected;

const isServicesSelectedSelector = createSelector(
  isCosmosResourceCreatedSelector,
  isAzureFunctionsSelectedSelector,
  isAppServiceSelectedSelector,
  isServicesSelected
);

const isServicesDeployedOrFinished = (
  services: IAzureServiceStatus
): boolean => {
  const { cosmosdb, azureFunctions, appService } = services;
  let isFinished = true;
  if (cosmosdb.isSelected) {
    isFinished = isFinished && (cosmosdb.isDeployed || cosmosdb.isFailed);
  }
  if (azureFunctions.isSelected) {
    isFinished =
      isFinished && (azureFunctions.isDeployed || azureFunctions.isFailed);
  }
  if (appService.isSelected) {
    isFinished = isFinished && (appService.isDeployed || appService.isFailed);
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
  isAppServiceCreatedSuccessSelector,
  isAppServiceCreatedFailureSelector,
  isServicesSelectedSelector,
  servicesToDeploySelector
};
