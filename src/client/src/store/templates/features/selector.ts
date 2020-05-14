import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";
import { IOption } from "../../../types/option";

const getFeatures = (state: AppState) => state.templates.featureOptions;

const getServicesByTypeSelector = createSelector(getFeatures, (features) => {
  const result = features.reduce((result, feature) => {
    const serviceType = feature.group ? feature.group : "none";
    const features = result.get(serviceType);
    const services = features ? [...features, feature] : [feature];
    return result.set(serviceType, services);
  }, new Map<string, IOption[]>());
  return result;
  /*
    const serviceTypes = features
      .filter(g => g.group !== undefined)
      .map(option => option.group) as string[];

    return [...new Set(serviceTypes)];*/
});

export { getServicesByTypeSelector };
