import { createSelector } from "reselect";

import { IServiceStatus } from "../reducers/generationStatus/genStatus";
import { isCosmosResourceCreatedSelector } from "./cosmosServiceSelector";
import { isAzureFunctionsSelectedSelector } from "./azureFunctionsServiceSelector";

const getGenerationStatusSelector = (state: any) =>
  state.generationStatus.genStatus;

const getSyncStatusSelector = (state: any): string =>
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

const isServicesDeployed = (
  isCosmosSelected: boolean,
  isCosmosSuccess: boolean,
  isCosmosFailure: boolean,
  isFunctionsSelected: boolean,
  isAzureFunctionsSuccess: boolean,
  isAzureFunctionsFailure: boolean
): boolean => {
  let isDeployed = true;
  if (isCosmosSelected) {
    isDeployed = false;
    if (isCosmosSuccess) {
      isDeployed = true;
    } else if (isCosmosFailure) {
      isDeployed = false;
    }
  }
  if (isFunctionsSelected) {
    isDeployed = false;
    if (isAzureFunctionsSuccess) {
      isDeployed = true;
    } else if (isAzureFunctionsFailure) {
      isDeployed = false;
    }
  }
  return isDeployed;
};

const isServicesFailure = (
  isCosmosFailure: boolean,
  isFunctionsFailure: boolean
): boolean => isCosmosFailure && isFunctionsFailure;

const isServicesDeployedSelector = createSelector(
  isCosmosResourceCreatedSelector,
  isCosmosDeployedSuccessSelector,
  isCosmosDeployedFailureSelector,
  isAzureFunctionsSelectedSelector,
  isAzureFunctionsDeployedSuccessSelector,
  isAzureFunctionsDeployedFailureSelector,
  isServicesDeployed
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

export {
  getSyncStatusSelector,
  isTemplateGeneratedSelector,
  isServicesDeployedSelector,
  isServicesFailureSelector,
  isTemplatesFailedSelector,
  isServicesSelectedSelector
};
