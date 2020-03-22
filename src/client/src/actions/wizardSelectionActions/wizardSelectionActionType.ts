import { ISelectFrontendAction, ISelectBackendAction } from "../../store/selection/frameworks/model";
import { IsetPagesAction, ISetPageAction, IResetPagesAction } from "../../store/selection/pages/model";
import { IProjectPathValidationAction, IValidationsAction } from "../../store/selection/validations/model";
import { ISelectProjectTypeAction, ISetProjectNameActionType, IUpdateProjectPathActionType } from "../../store/selection/app/model";

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
