import { IPreviewStatusActionTypeAction, IResetWizardAction } from "./config/model";
import { ISetPlatformTypeAction } from "./platform/model";
import { IProjectPathValidationAction, IValidationsAction } from "./validations/model";
import { IVersionData } from "./versions/model";

type ConfigType =
  | ISetPlatformTypeAction
  | IVersionData
  | IResetWizardAction
  | IPreviewStatusActionTypeAction
  | IProjectPathValidationAction
  | IValidationsAction;

export default ConfigType;
