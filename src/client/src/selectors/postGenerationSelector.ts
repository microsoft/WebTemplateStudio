import _ from "lodash";
import { createSelector } from "reselect";

import { isCosmosResourceCreatedSelector } from "./cosmosServiceSelector";

const getGenerationStatusSelector = (state: any) =>
  state.generationStatus.genStatus;

const getSyncStatusSelector = (state: any): string =>
  state.generationStatus.statusMessage;

const isTemplateGenerated = (progressObject: any): boolean =>
  progressObject.templates.success;
const isTemplatesFailed = (progressObject: any): boolean =>
  progressObject.templates.failure;
const isCosmosDeployedSuccess = (progressObject: any): boolean =>
  progressObject.cosmos.success;
const isCosmosDeployedFailure = (progressObject: any): boolean =>
  progressObject.cosmos.failure;

const isCosmosDeployedSuccessSelector = createSelector(
  getGenerationStatusSelector,
  isCosmosDeployedSuccess
);

const isCosmosDeployedFailureSelector = createSelector(
  getGenerationStatusSelector,
  isCosmosDeployedFailure
);

const isTemplateGeneratedSelector = createSelector(
  getGenerationStatusSelector,
  isTemplateGenerated
);

const isServicesDeployed = (
  isCosmosSelected: boolean,
  isCosmosDeployedSuccess: boolean,
  isCosmosDeployedFailure: boolean
): boolean => {
  let isDeployed = true;
  if (isCosmosSelected) {
    isDeployed = false;
    if (isCosmosDeployedSuccess) {
      isDeployed = true;
    } else if (isCosmosDeployedFailure) {
      isDeployed = false;
    }
  }
  return isDeployed;
};

const isServicesDeployedSelector = createSelector(
  isCosmosResourceCreatedSelector,
  isCosmosDeployedSuccessSelector,
  isCosmosDeployedFailureSelector,
  isServicesDeployed
);

export {
  getSyncStatusSelector,
  isTemplateGeneratedSelector,
  isServicesDeployedSelector
};
