import { ISelectBackendAction } from "./selectedBackEndFramework";
import { ISelectFrontendAction } from "./selectedFrontendFramework";
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
