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
    const { previewStatus, backendOptions, frontendOptions, pageOptions } = state!.wizardContent;

    /* Elements that are undefined tell the reducer to replace the element
     * with the initial state that is specified in the element's reducer.
     * See: https://redux.js.org/recipes/structuring-reducers/initializing-state
     */
    passedState = {
      azureProfileData: state!.azureProfileData,
      dependencyInfo: undefined,
      generationStatus: undefined,
      modals: undefined,
      selection: {
        validations:state!.selection.validations,
        projectNameObject:{
          projectName:"",
          validation:{
            isValid:true,
            error:"",
            isDirty:false
          }
        },
        frontendFramework:frontendOptions.filter((frame)=>frame.internalName==="React")[0],
        backendFramework:backendOptions.filter((frame)=>frame.internalName==="Node")[0]
      },
      versions: state!.versions,
      vscode: state!.vscode,
      wizardContent: { previewStatus,backendOptions, frontendOptions, pageOptions },
      wizardRoutes: undefined,
    };


  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
