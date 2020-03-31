import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../store/vscode/model";

interface IDispatchProps {
  updateDependencyInfo: (dependencyInfo: IDependencyInfoAction) => any;
}

interface IStateProps {
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, IDispatchProps };