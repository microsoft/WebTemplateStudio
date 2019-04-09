import { ISelectBackendAction } from "./selectBackEndFramework";
import { ISelectFrontendAction } from "./selectFrontEndFramework";
import { ISelectPagesAction } from "./selectPages";
import { ISelectProjectTypeAction } from "./selectWebApp";
import { IProjectPathValidationAction } from "./setProjectPathValidation";
import {
  IUpdateProjectNameActionType,
  IUpdateProjectPathActionType
} from "./updateProjectNameAndPath";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | ISelectPagesAction
  | ISelectProjectTypeAction
  | IProjectPathValidationAction
  | IUpdateProjectNameActionType
  | IUpdateProjectPathActionType;

export default WizardSelectionActionType;
