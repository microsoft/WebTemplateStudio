import { createSelector } from "reselect";

import { ILicenseObject } from "../../types/license";
import { AppState } from "../combineReducers";
import { UserSelectionState } from "./combineReducers";

const getUserSelection = (state: AppState) => state.userSelection;
const getFrameworkLicenses = (userSelection: UserSelectionState): string[] => {
  const licenses = [];
  licenses.push(userSelection.frontendFramework.licenses);
  licenses.push(userSelection.backendFramework.licenses);
  return licenses;
};
const getPageLicenses = (userSelection: UserSelectionState): ILicenseObject[] => {
  const licenses = [];
  const licenseSet = new Set();
  for (const page of userSelection.pages) {
    for (const license of page.licenses) {
      if (!licenseSet.has(license.text)) {
        licenses.push(license);
        licenseSet.add(license.text);
      }
    }
  }
  return licenses;
};

const getFrameworkLicensesSelector = createSelector(getUserSelection, getFrameworkLicenses);

const getPageLicencesSelector = createSelector(getUserSelection, getPageLicenses);

export { getFrameworkLicensesSelector, getPageLicencesSelector };
