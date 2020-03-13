import { IRightSidebarProps, IDispatchProps } from "./interfaces";
import { AppState } from "../../reducers";
import { getProjectName, getServicesSelector, getOutputPath } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { ISelected } from "../../types/selected";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { hasServicesSelector } from "../../selectors/servicesSelector";
import { getIsVisitedRoutesSelector } from "../../selectors/wizardNavigationSelector";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { setSelectedBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectedBackEndFramework";
import { setSelectedFrontendFrameworkAction } from "../../actions/wizardSelectionActions/selectedFrontendFramework";
import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import { selectPagesAction, resetPagesAction } from "../../actions/wizardSelectionActions/selectPages";
import * as ModalActions from "../../actions/modalActions/modalActions";


function convertOptionsToDropdownItems(options: any[]): IDropDownOptionType[] {
  const dropDownItems = [];
  for (const option of options) {
    if (option.unselectable) {
      continue;
    }
    const dropdownItem = convertOptionToDropdownItem(option);
    dropDownItems.push(dropdownItem);
  }
  return dropDownItems;
}

const convertOptionToDropdownItem = (option: ISelected): IDropDownOptionType => {
  if (option.internalName && option.title) {
    return {
      value: option.internalName,
      label: option.title
    };
  }
  return {
    value: "",
    label: ""
  };
}


const mapStateToProps = (state: AppState): IRightSidebarProps => ({
  outputPath: getOutputPath(state),
  projectName: getProjectName(state),
  selection: state.selection,
  projectTypeDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.projectTypes
  ),
  frontEndOptions: state.wizardContent.frontendOptions,
  frontendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.frontendOptions
  ),
  backendDropdownItems: convertOptionsToDropdownItems(
    state.wizardContent.backendOptions
  ),
  vscode: getVSCodeApiSelector(state),
  services: getServicesSelector(state),
  hasServices : hasServicesSelector(state),
  isRoutesVisited: getIsVisitedRoutesSelector(state),
  contentOptions: state.wizardContent,
  wizardRoutes: state.wizardRoutes
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectBackendFramework: (framework: ISelected) => {
    dispatch(setSelectedBackendFrameworkAction(framework));
  },
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(setSelectedFrontendFrameworkAction(framework));
  },
  selectProjectType: (projectType: ISelected) => {
    dispatch(selectWebAppAction(projectType));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  openViewLicensesModal: () => {
    dispatch(ModalActions.openViewLicensesModalAction());
  },
  resetPageSelection: () => {
    dispatch(resetPagesAction());
  },
});

export {mapDispatchToProps, mapStateToProps}