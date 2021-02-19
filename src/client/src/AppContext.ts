import * as React from "react";
import { IVSCodeObject } from "./types/vscode";
import mockVsCodeApi from "./mockData/mockVsCodeApi";

interface IAppContext {
  vscode: IVSCodeObject;
}

export const AppContext = React.createContext<IAppContext>({ vscode: mockVsCodeApi() });
