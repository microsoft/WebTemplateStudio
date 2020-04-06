
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionTypeAction } from "./config/model";

type WizardContentActionType =
  | IPageOptionsActionType
  | IPreviewStatusActionTypeAction;

export default WizardContentActionType;
