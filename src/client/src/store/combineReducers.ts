import { combineReducers } from "redux";
import azureProfileData from "./azureProfileData/combineReducers";
import generationStatus from "./generationStatus/combineReducers";
import modals from "./modals/combineReducers";
import templates from "./templates/combineReducers";
import config from "./config/combineReducers";
import wizardRoutes from "./selection/pages/combineReducers";
import selection from "./selection/combineReducers";
import versions from "./versions/reducer";
import RootAction from "./ActionType";
import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

const appReducer = combineReducers({
  templates,
  config,
  selection,
  azureProfileData,
  modals,
  wizardRoutes,
  generationStatus,
  versions
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: RootAction) => {
  let passedState: any;

  if (action.type === WIZARD_INFO_TYPEKEYS.RESET_WIZARD) {
    const { backendOptions, frontendOptions, pageOptions } = state!.templates;
    const { previewStatus } = state!.config;

    /* Elements that are undefined tell the reducer to replace the element
     * with the initial state that is specified in the element's reducer.
     * See: https://redux.js.org/recipes/structuring-reducers/initializing-state
     */
    passedState = {
      azureProfileData: state!.azureProfileData,
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
      template: { backendOptions, frontendOptions, pageOptions },
      config:{previewStatus},
      wizardRoutes: undefined,
    };


  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
