import {ISelectProjectTypeAction} from "./platform/model";
import { IVersionData } from "./versions/model";
import { IResetWizardAction, IPreviewStatusActionTypeAction } from "./config/model";
import { IProjectPathValidationAction, IValidationsAction} from "./validations/model";

type ConfigType =
  ISelectProjectTypeAction
  | IVersionData
  | IResetWizardAction
  | IPreviewStatusActionTypeAction
  | IProjectPathValidationAction
  | IValidationsAction;

export default ConfigType;
