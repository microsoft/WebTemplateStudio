import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";

const getConfigSelector = (state: AppState) => state.config;

const getPlatformSelector = createSelector(getConfigSelector, (config) => config.platform);

const getPlatformRequirementsSelector = createSelector(getPlatformSelector, (platform) => platform.requirements);

const hasInvalidPlatformRequirementsSelector = createSelector(getPlatformRequirementsSelector, (requirements) => {
  const invalidRequirements = requirements.filter((r) => !r.isInstalled);
  return invalidRequirements.length > 0;
});

export { hasInvalidPlatformRequirementsSelector };
