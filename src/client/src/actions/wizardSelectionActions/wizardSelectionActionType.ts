

import { ISelectProjectTypeAction } from "./selectWebApp";
import { IValidationsAction } from "./setValidations";
import {
  IUpdateProjectNameActionType,
  IUpdateProjectPathActionType
} from "./updateProjectNameAndPath";
import { ISelectFrontendAction, ISelectBackendAction } from "../../store/selection/frameworks/model";
import { IsetPagesAction, ISetPageAction, IResetPagesAction } from "../../store/selection/pages/model";
import { IProjectPathValidationAction } from "../../store/selection/validations/model";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | IsetPagesAction
  | ISetPageAction
  | ISelectProjectTypeAction
  | IProjectPathValidationAction
  | IValidationsAction
  | IUpdateProjectNameActionType
  | IUpdateProjectPathActionType
  | IResetPagesAction;

export default WizardSelectionActionType;
