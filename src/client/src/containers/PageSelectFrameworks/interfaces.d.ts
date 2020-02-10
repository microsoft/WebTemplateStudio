import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

interface ISelectFrameworksProps {
  vscode: IVSCodeObject;
  frontendOptions:IOption[];
  backendOptions:IOption[];
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, ISelectFrameworksProps };