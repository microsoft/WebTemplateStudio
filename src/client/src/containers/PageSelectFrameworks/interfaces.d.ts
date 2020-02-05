import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

interface ISelectFrameworksProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  frontendOptions:IOption[];
  backendOptions:IOption[];
}

interface IDispatchProps {
  setBackendFrameworks: (frameworks: IOption[]) => any;
  setFrontendFrameworks: (frameworks: IOption[]) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, IDispatchProps, ISelectFrameworksProps };