import { IOption } from "../../types/option";

interface IDispatchProps {
  updateDependencyInfo: (dependencyInfo: IDependencyInfoAction) => any;
}

interface IStateProps {
  frontendOptions: IOption[];
  backendOptions: IOption[];
}

export { IStateProps, IDispatchProps };