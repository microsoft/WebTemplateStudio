import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import Select from "react-select/lib/Select";
import { ISelected } from "../../../types/selected";

interface IDispatchProps {
}

interface IStoreProps {
  options: IOption[];
  pageOutOfBounds: boolean;
}

interface IIntlProps {
  intl: InjectedIntl;
}

interface IProps {
  isModal?: boolean;
}

export { IIntlProps, IDispatchProps, IStoreProps, IProps };
