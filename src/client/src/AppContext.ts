import * as React from "react";

import mockVsCodeApi from "./mockData/mockVsCodeApi";
import { IVSCodeObject } from "./types/vscode";

interface IAppContext {
  vscode: IVSCodeObject;
}

export const AppContext = React.createContext<IAppContext>({ vscode: mockVsCodeApi() });
