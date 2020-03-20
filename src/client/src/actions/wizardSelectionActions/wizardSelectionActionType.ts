

import { ISelectProjectTypeAction } from "./selectWebApp";
import { IProjectPathValidationAction } from "./setProjectPathValidation";
import { IValidationsAction } from "./setValidations";
import {
  IUpdateProjectNameActionType,
  IUpdateProjectPathActionType
} from "./updateProjectNameAndPath";
import { ISelectFrontendAction, ISelectBackendAction } from "../../store/selection/frameworks/model";
import { ISelectPagesAction, ISelectPageAction, IResetPagesAction } from "../../store/selection/pages/model";

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
