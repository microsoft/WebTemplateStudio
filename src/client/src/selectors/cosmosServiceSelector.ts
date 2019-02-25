import _ from "lodash";
import { createSelector } from "reselect";

//FIXME: Define the "Type" for the services selection
const getServicesSelector = (state: any): object => state.selection.services;
const areServicesSelectedSelector = (services: any): boolean => {
    return !_.isEmpty(services);
}
const isCosmosDbSelected = (services: any, areServicesSelected: boolean): boolean => {
    if (areServicesSelected) {
        return _.has(services, "cosmosOptions");
    }
    return false;
}

const isCosmosResourceCreatedSelector = createSelector(
    getServicesSelector,
    areServicesSelectedSelector,
    isCosmosDbSelected
)

const getCosmosDbOptions = (services: any, isCosmosSelected: boolean): any => {
    if (isCosmosSelected) {
        return services.cosmosOptions;
    } else {
        return {};
    }
}
const getCosmosDbSelectionSelector = createSelector(
    getServicesSelector,
    isCosmosResourceCreatedSelector,
    getCosmosDbOptions
)

export { getCosmosDbSelectionSelector, getServicesSelector, isCosmosResourceCreatedSelector };
