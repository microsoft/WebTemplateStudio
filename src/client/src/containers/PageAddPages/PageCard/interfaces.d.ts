import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ISelected } from "../../../types/selected";

interface IProps {
  page: IOption;
  isModal: boolean;
}

interface IDispatchProps {
  setPages: (pages: ISelected[]) => void;
  setDetailPage: (framework: IOption) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  selectedPages: ISelected[];
  selectedFrontend: ISelected;
  pageOutOfBounds: boolean;
}

export { IStateProps, IDispatchProps, IProps };
