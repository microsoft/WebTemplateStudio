import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import Select from "react-select/lib/Select";
import { ISelected } from "../../../types/selected";

interface ISelectProps {
  vscode: IVSCodeObject;
  page:IOption;
}

interface IDispatchProps {
  setPages: (pages: ISelected[]) => void;
  setDetailPage: (framework: IOption) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  selectedPages: ISelected[];
}

export { IStateProps, IDispatchProps, ISelectProps };
