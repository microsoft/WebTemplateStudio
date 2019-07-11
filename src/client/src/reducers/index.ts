import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import dependencyInfo from "./dependencyInfoReducers";
import generationStatus from "./generationStatus";
import modals from "./modalReducers";
import wizardContent from "./wizardContentReducers";
import wizardRoutes from "./wizardRoutes";
import vscodeApi from "./vscodeApiReducer";
import selection from "./wizardSelectionReducers";
import versions from "./versionsReducer";
import RootAction from "../actions/ActionType";
import { WIZARD_INFO_TYPEKEYS } from "../actions/wizardInfoActions/typeKeys";

const appReducer = combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  modals,
  wizardRoutes,
  generationStatus,
  versions,
  dependencyInfo
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: RootAction) => {
  let passedState: any;

  if (action.type === WIZARD_INFO_TYPEKEYS.RESET_WIZARD) {
    const { previewStatus } = state!.wizardContent;

    passedState = {
      azureProfileData: state!.azureProfileData,
      dependencyInfo: undefined,
      generationStatus: undefined,
      modals: undefined,
      selection: undefined,
      wizardContent: { previewStatus },
      wizardRoutes: undefined,
      versions: state!.versions,
      vscode: state!.vscode
    };
  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
