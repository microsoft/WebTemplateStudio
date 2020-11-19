import * as React from "react";
import { IVSCodeObject } from "./types/vscode";
import mockVsCodeApi from "./mockData/mockVsCodeApi";
import { DEVELOPMENT, PLATFORM } from "./utils/constants/constants";

interface IAppContext {
  vscode: IVSCodeObject;
}

//TODO: THIS COULD BE IMPROVED FOR DEV
//TODO: USE LAUNCH COMMAND HERE
const devPlatform = PLATFORM.RN;
export const platform = (process.env.NODE_ENV === DEVELOPMENT) ? devPlatform : PLATFORM.WEB;

export const AppContext = React.createContext<IAppContext>({vscode:mockVsCodeApi(platform) as IVSCodeObject});