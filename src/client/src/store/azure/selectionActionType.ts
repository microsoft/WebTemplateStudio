import { ISelectBackendAction, ISelectFrontendAction } from "../selection/frameworks/model";
import { IsetPagesAction, ISetPageAction, IResetPagesAction } from "../selection/pages/model";
import { IProjectPathValidationAction, IValidationsAction } from "../selection/validations/model";
import { ISelectProjectTypeAction, IUpdateProjectPathActionType, ISetProjectNameActionType } from "../selection/app/model";

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
