import { createSelector } from "reselect";
import { RowType } from "../../../../types/rowType";
import { ISelected } from "../../../../types/selected";
import { IValidation } from "../../../../utils/validations/validations";
import { AppState } from "../../../combineReducers";
import { UserSelectionState } from "../../combineReducers";
import { ROUTES } from "../../../../utils/constants";
import { IValidations } from "../../../config/validations/model";

const getWizardSelectionsSelector = (state: AppState): UserSelectionState =>
  state.userSelection;
const getProjectName = (state: AppState): string =>
  state.userSelection.projectNameObject.projectName;
const getProjectNameValidation = (state: AppState): IValidation =>
  state.userSelection.projectNameObject.validation;
const getValidations = (state: AppState): IValidations =>
  state.config.validations;
const getSelectedPages = (state: AppState): Array<ISelected> =>
  state.userSelection.pages;
const getOutputPath = (state: AppState): string =>
  state.userSelection.outputPathObject.outputPath;
const isEnableNextPageSelector = (state: AppState): boolean =>{
  let valid = false;
  if (state.navigation.routes.selected === ROUTES.NEW_PROJECT){
    valid = state.userSelection.projectNameObject.validation.isValid === true && 
      state.userSelection.outputPathObject.outputPath !== "";
  }

  if (state.navigation.routes.selected === ROUTES.SELECT_FRAMEWORKS &&
    state.userSelection.frontendFramework.title !== "" && state.userSelection.backendFramework.title !== "" &&
    state.userSelection.pages.filter(page => !page.isValidTitle).length === 0){
    valid = true;
  }

  if (state.navigation.routes.selected === ROUTES.SELECT_PAGES && state.userSelection.pages.length>0 && 
    state.userSelection.pages.filter(page => !page.isValidTitle).length === 0){
    valid = true;
  }

  if ((state.navigation.routes.selected === ROUTES.ADD_SERVICES || state.navigation.routes.selected === ROUTES.REVIEW_AND_GENERATE)
    && state.userSelection.pages.filter(page => !page.isValidTitle).length === 0){
    valid = true;
  }

  return valid;
}

export interface ISelectedPages {
  selectedPages: Array<ISelected>;
}

export const mapStateSelectedPages = (state: AppState): ISelectedPages => ({
  selectedPages: getSelectedPages(state),
});

const getOutputPathValidation = (state: AppState): IValidation =>
  state.userSelection.outputPathObject.validation;

const isValidNameAndProjectPath = (
  projectNameValidationObject: IValidation,
  outputPathValidationObject: IValidation,
  outputPath: string,
  projectName: string
): boolean => {
  if (!projectNameValidationObject || !outputPathValidationObject) {
    return false;
  }
  if (outputPath === "" || projectName === "") {
    return false;
  }
  if (
    !projectNameValidationObject.isValid ||
    !outputPathValidationObject.isValid
  ) {
    return false;
  }
  return true;
};

const isValidNameAndProjectPathSelector = createSelector(
  getProjectNameValidation,
  getOutputPathValidation,
  getOutputPath,
  getProjectName,
  isValidNameAndProjectPath
);

const frameworksRowItems = (selection: UserSelectionState): RowType[] => {
  const { frontendFramework, backendFramework } = selection;
  return [
    {
      title: frontendFramework.title,
      internalName: frontendFramework.internalName,
      version: frontendFramework.version!,
      author: frontendFramework.author
    },
    {
      title: backendFramework.title,
      internalName: backendFramework.internalName,
      version: backendFramework.version!,
      author: backendFramework.author
    }
  ];
};

const getFrameworksRowItemSelector = createSelector(
  getWizardSelectionsSelector,
  frameworksRowItems
);

export {
  getWizardSelectionsSelector,
  getFrameworksRowItemSelector,
  getOutputPath,
  getOutputPathValidation,
  getProjectName,
  getValidations,
  getProjectNameValidation,
  isValidNameAndProjectPathSelector,
  isEnableNextPageSelector
};