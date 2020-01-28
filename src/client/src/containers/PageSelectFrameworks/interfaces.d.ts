import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { setBackendFrameworks } from "../../actions/wizardContentActions/getBackendFrameworks";
import { setFrontendFrameworks } from "../../actions/wizardContentActions/getFrontendFrameworks";

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
