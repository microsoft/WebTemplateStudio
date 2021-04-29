import { ISelected } from "../../../types/selected";
import { IOption } from "../../types/option";

interface IProps {
  page: IOption;
  isModal: boolean;
}

interface IStateProps {
  selectedPages: ISelected[];
  selectedFrontend: ISelected;
  pageOutOfBounds: boolean;
}

export { IProps, IStateProps };
