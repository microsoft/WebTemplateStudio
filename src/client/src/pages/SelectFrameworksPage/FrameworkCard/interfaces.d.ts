import { IOption } from "../../types/option";
import { ISelected } from "../../../types/selected";

interface ISelectProps {
  framework: IOption;
  isFrontEnd: boolean;
}

interface IStateProps {
  isPreview: boolean;
  frontEndSelect: ISelected;
  backEndSelect: ISelected;
}

export { IStateProps, ISelectProps };
