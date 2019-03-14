import _ from "lodash";
import { createSelector } from "reselect";

const getServicesSelector = (state: any): object => state.selection.services;

/**
 * Returns the Azure Functions selection made by a developer.
 * Returns undefined if a selection was not made.
 * 
 * @param services An object of all the services available in Project Acorn
 * @param isAzureFunctionsSelected A boolean that tells if Azure Functions was selected
 */
const getAzureFunctionsSelection = (services: any): any => {
    return services.azureFunctions.selection[0];
}

const getFunctionsSelection = createSelector(
    getServicesSelector,
    getAzureFunctionsSelection
)

export { getFunctionsSelection };
