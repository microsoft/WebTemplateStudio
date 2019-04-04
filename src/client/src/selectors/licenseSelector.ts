import { createSelector } from "reselect";
import { License } from "../types/license";

const getSelection = (state: any) => state.selection;
const getFrameworkLicenses = (selection: any): License[] => {
  const licenses = [];
  licenses.push(selection.frontendFramework.licenses);
  licenses.push(selection.backendFramework.licenses);
  return licenses;
};

const getFrameworkLicensesSelector = createSelector(
  getSelection,
  getFrameworkLicenses
);

export { getFrameworkLicensesSelector };
