import { IOption } from "../../types/option";
import { ISelected } from "../../../types/selected";

interface IProps {
  page: IOption;
  isModal: boolean;
}

interface IStateProps {
  selectedPages: ISelected[];
  selectedFrontend: ISelected;
  pageOutOfBounds: boolean;
}

export { IStateProps, IProps };
