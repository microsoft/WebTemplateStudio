import { combineReducers } from "redux";
import navigation from "./navigation/combineReducers";
import templates from "./templates/combineReducers";
import config from "./config/combineReducers";
import userSelection from "./userSelection/combineReducers";
import RootAction from "./ActionType";
import { CONFIG_TYPEKEYS } from "./config/configTypeKeys";
import { IRoutesNavItems } from "../types/route";
import { ISelected } from "../types/selected";

const appReducer = combineReducers({
  templates,
  config,
  userSelection,
  navigation
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: RootAction) => {
  let passedState: any;

  if (action.type === CONFIG_TYPEKEYS.RESET_WIZARD) {
    const { backendOptions, frontendOptions, pageOptions, featureOptions, projectTypesOptions } = state!.templates;
    const { previewStatus, detailsPage, validations, versions, azureProfileData, platform } = state!.config;
    let routesNavItems: IRoutesNavItems[] = state!.navigation.routesNavItems;
    const blankPage = pageOptions[0];
    const blankSelect: ISelected = {
      author: blankPage.author,
      defaultName: blankPage.defaultName,
      internalName: blankPage.internalName,
      isValidTitle: blankPage.isValidTitle,
      licenses: blankPage.licenses,
      title: blankPage.defaultName ? blankPage.defaultName : "",
      id:Math.random().toString()
    };;
    routesNavItems = routesNavItems.map((navItem, index)=>{
      if (index==0){
        navItem.isSelected=true;
        navItem.wasVisited=true;
      }else{
        navItem.isSelected=false;
        navItem.wasVisited=false;
      }
      return navItem;
    })

    passedState = {
      navigation: {
        modals:undefined,
        routesNavItems
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
        frontendFramework:frontendOptions[0],
        backendFramework:backendOptions[0],
        pages:[blankSelect]
      },
      templates: { backendOptions, frontendOptions, pageOptions, featureOptions, projectTypesOptions },
      config:{
        previewStatus,
        validations,
        detailsPage,
        versions,
        azureProfileData,
        platform
      }
    };


  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
