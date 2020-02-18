import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

interface IDispatchProps {
  setBackendFrameworks: (frameworks: IOption[]) => any;
  setFrontendFrameworks: (frameworks: IOption[]) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, IDispatchProps };