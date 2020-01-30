import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import Select from "react-select/lib/Select";
import { ISelected } from "../../../types/selected";

interface IDispatchProps {
  updatePageCount: (pageCount: IPageCount) => any;
}

interface ISelectProps {
  vscode: IVSCodeObject;
  options: IOption[];
  selectedBackend: ISelected;
  selectedFrontend: ISelected;
  selectedPages: ISelected[];
}

interface IIntlProps {
  intl: InjectedIntl;
}

export { IIntlProps, IDispatchProps, ISelectProps };
