import { ISelected } from "../../../types/selected";
import { IOption } from "../../types/option";

interface ISelectProps {
  framework: IOption;
  isFrontEnd: boolean;
}

interface IStateProps {
  isPreview: boolean;
  frontEndSelect: ISelected;
  backEndSelect: ISelected;
}

export { ISelectProps, IStateProps };
