import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { setBackendFrameworks } from "../../actions/wizardContentActions/getBackendFrameworks";
import { setFrontendFrameworks } from "../../actions/wizardContentActions/getFrontendFrameworks";
import Select from "react-select/lib/Select";
import { ISelected } from "../../../types/selected";

interface ISelectProps {
  vscode: IVSCodeObject;
  framework:IOption;
  isFrontEnd:boolean;
}

interface IDispatchProps {
  setFrontendSelect: (framework: ISelected) => any;
  setBackendSelect: (framework: ISelected) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  frontEndSelect: ISelected;
  backEndSelect: ISelected;
}

export { IStateProps, IDispatchProps, ISelectProps };
