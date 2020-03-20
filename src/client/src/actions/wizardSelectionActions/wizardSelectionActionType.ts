import { ISelectBackendAction } from "./selectedBackEndFramework";
import {
  ISelectPagesAction,
  IResetPagesAction,
  ISelectPageAction
} from "./selectPages";
import { ISelectProjectTypeAction } from "./selectWebApp";
import { IProjectPathValidationAction } from "./setProjectPathValidation";
import { IValidationsAction } from "./setValidations";
import {
  IUpdateProjectNameActionType,
  IUpdateProjectPathActionType
} from "./updateProjectNameAndPath";
import { ISelectFrontendAction } from "../../store/selection/frameworks/model";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | ISelectPagesAction
  | ISelectPageAction
  | ISelectProjectTypeAction
  | IProjectPathValidationAction
  | IValidationsAction
  | IUpdateProjectNameActionType
  | IUpdateProjectPathActionType
  | IResetPagesAction;

export default WizardSelectionActionType;
