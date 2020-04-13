
import { IPageOptionsActionType } from "../navigation/routes/model";
import { IPreviewStatusActionTypeAction } from "./config/model";

type WizardContentActionType =
  | IPageOptionsActionType
  | IPreviewStatusActionTypeAction;

export default WizardContentActionType;
