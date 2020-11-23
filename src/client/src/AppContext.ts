import * as React from "react";
import { IVSCodeObject } from "./types/vscode";
import mockVsCodeApi from "./mockData/mockVsCodeApi";
import { ENVIRONMENT, PLATFORM } from "./utils/constants/constants";
import { WIZARD_PROJECT_TYPE } from "./utils/constants/internalNames";

interface IAppContext {
  vscode: IVSCodeObject;
}

//TODO: THIS COULD BE IMPROVED FOR DEV
//TODO: Add something on the mocked to choose between platform
//TODO: USE LAUNCH COMMAND HERE. When you choose that from Command Palette:
//TODO: Web Template Studio: Create Web App
//TODO: Web Template Studio: Create React Native App
const devPlatform = PLATFORM.WEB;
export const platform = (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) ? devPlatform : PLATFORM.WEB;

export let projectType = "";
switch(platform as string){
  case PLATFORM.WEB:
    projectType = WIZARD_PROJECT_TYPE.FULL_STACK_APP;
    break;
  case PLATFORM.RN:
    projectType = WIZARD_PROJECT_TYPE.RN_TABBED_APP;
    break;
  }

export const AppContext = React.createContext<IAppContext>({vscode:mockVsCodeApi(platform) as IVSCodeObject});
