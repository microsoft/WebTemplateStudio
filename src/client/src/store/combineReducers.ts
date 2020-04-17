import { combineReducers } from "redux";
import navigation from "./navigation/combineReducers";
import templates from "./templates/combineReducers";
import config from "./config/combineReducers";
import userSelection from "./userSelection/combineReducers";
import selection from "./selection/combineReducers";
import RootAction from "./ActionType";
import { CONFIG_TYPEKEYS } from "./config/configTypeKeys";

const appReducer = combineReducers({
  templates,
  config,
  userSelection,
  selection,
  navigation
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: RootAction) => {
  let passedState: any;

  if (action.type === CONFIG_TYPEKEYS.RESET_WIZARD) {
    const { backendOptions, frontendOptions, pageOptions } = state!.templates;
    const { previewStatus, detailsPage, validations, isValidatingName, versions, azureProfileData } = state!.config;

    passedState = {
      navigation: {
        modals:undefined
      },
      userSelection: {
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
      templates: { backendOptions, frontendOptions, pageOptions },
      config:{
        previewStatus,
        validations,
        detailsPage,
        isValidatingName,
        versions,
        azureProfileData
      },
      wizardRoutes: undefined,
    };


  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
