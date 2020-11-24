import * as React from "react";
import { IVSCodeObject } from "./types/vscode";
import mockVsCodeApi from "./mockData/mockVsCodeApi";
import { ENVIRONMENT, PLATFORM } from "./utils/constants/constants";
import { WEB_PROJECT_TYPE, RN_PROJECT_TYPE } from "./utils/constants/internalNames";

interface IAppContext {
  vscode: IVSCodeObject;
}

//TODO: THIS COULD BE IMPROVED FOR DEV
//TODO: Add something on the mocked to choose between platform
//TODO: USE LAUNCH COMMAND HERE. When you choose that from Command Palette:
//TODO: Web Template Studio: Create Web App
//TODO: Web Template Studio: Create React Native App
const devPlatform = PLATFORM.RN;
export const platform = (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) ? devPlatform : PLATFORM.WEB;

export let projectType = "";
switch(platform as string){
  case PLATFORM.WEB:
    projectType = WEB_PROJECT_TYPE.FULL_STACK_APP;
    break;
  case PLATFORM.RN:
    projectType = RN_PROJECT_TYPE.TABBED;
    break;
  }

  const vscode = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION ?
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore because function does not exist in dev environment
  acquireVsCodeApi(): mockVsCodeApi(platform);

export const AppContext = React.createContext<IAppContext>({vscode: vscode as IVSCodeObject});
