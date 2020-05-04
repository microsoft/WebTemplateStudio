import _ from "lodash";
import { createSelector } from "reselect";
import { ConfigState } from "../combineReducers";
import { AppState } from "../../combineReducers";

const getConfigSelector = (state: AppState): ConfigState => state.config;

const getProjectTypeSelector = createSelector(
  getConfigSelector,
  (config) => config.appType.internalName
);

export { getProjectTypeSelector };