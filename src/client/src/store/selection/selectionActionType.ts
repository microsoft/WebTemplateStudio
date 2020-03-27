import { ISelectFrontendAction, ISelectBackendAction } from "./frameworks/model";
import { IsetPagesAction, ISetPageAction, IResetPagesAction } from "./pages/model";
import { IProjectPathValidationAction, IValidationsAction } from "./validations/model";
import { ISelectProjectTypeAction, ISetProjectNameActionType, IUpdateProjectPathActionType } from "./app/model";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | IsetPagesAction
  | ISetPageAction
  | ISelectProjectTypeAction
  | IProjectPathValidationAction
  | IValidationsAction
  | ISetProjectNameActionType
  | IUpdateProjectPathActionType
  | IResetPagesAction;

export default WizardSelectionActionType;
