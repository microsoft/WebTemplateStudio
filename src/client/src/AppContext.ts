import * as React from "react";
import { IVSCodeObject } from "./store/vscode/model";
import mockVsCodeApi from "./mockData/mockVsCodeApi";

interface IAppContext {
  vscode: IVSCodeObject;
}

export const AppContext = React.createContext<IAppContext>({vscode:mockVsCodeApi() as IVSCodeObject});