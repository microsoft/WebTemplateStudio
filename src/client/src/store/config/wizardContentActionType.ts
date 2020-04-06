
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionTypeAction } from "./wizardContent/model";

type WizardContentActionType =
  | IPageOptionsActionType
  | IPreviewStatusActionTypeAction;

export default WizardContentActionType;
