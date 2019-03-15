import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAzureFunctionsService } from "../reducers/wizardSelectionReducers/services/azureFunctionsReducer";

const getServicesSelector = (state: any): object => state.selection.services;

interface ISelectedDropdowns {
    subscription?: IDropDownOptionType;
    resourceGroup?: IDropDownOptionType;
    appName?: IDropDownOptionType;
    runtimeStack?: IDropDownOptionType;
    location?: IDropDownOptionType;
    numFunctions?: IDropDownOptionType;
}

interface ISelectionInformation { 
    dropdownSelection: ISelectedDropdowns
    previousFormData: ISelectedAzureFunctionsService;
}

/**
 * Returns the Azure Functions selection made by a developer.
 * Returns undefined if a selection was not made.
 * Currently, only one Azure Functions App can be added, hence
 * the hardcoded value of 0 index.
 * 
 * @param services An object of all the services available in Project Acorn
 * @param isAzureFunctionsSelected A boolean that tells if Azure Functions was selected
 */
const getAzureFunctionsSelectionInDropdownForm = (services: any): any => {
    const { selection } = services.azureFunctions;
    if (!_.isEmpty(selection)) {
        const selectionInformation: ISelectionInformation = {
            dropdownSelection: {},
            previousFormData: selection[0]
        };
        for (const selectionKey in selection[0]) {
            if (selectionKey) {
                // @ts-ignore to allow dynamic key selection
                selectionInformation.dropdownSelection[selectionKey] = {
                    value: selection[0][selectionKey],
                    label: selection[0][selectionKey]
                }
            }
        }
        return selectionInformation;
    }
}

const getFunctionsSelection = createSelector(
    getServicesSelector,
    getAzureFunctionsSelectionInDropdownForm
)

export { getFunctionsSelection };
