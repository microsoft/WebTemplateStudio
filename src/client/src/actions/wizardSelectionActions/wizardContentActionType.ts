import { ISelectBackendAction } from "./selectBackEndFramework";
import { ISelectFrontendAction } from "./selectFrontEndFramework";
import { ISelectPagesAction } from "./selectPages";
import { ISelectProjectTypeAction } from "./selectWebApp";
import { IProjectPathValidationAction } from "./setProjectPathValidation";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | ISelectPagesAction
  | ISelectProjectTypeAction
  | IProjectPathValidationAction;

export default WizardSelectionActionType;
