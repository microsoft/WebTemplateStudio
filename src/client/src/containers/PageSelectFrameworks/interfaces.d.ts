import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../store/vscode/vscodeApiReducer";

interface IDispatchProps {
  updateDependencyInfo: (dependencyInfo: IDependencyInfo) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, IDispatchProps };