import { ISetProjectNameActionType, IUpdateProjectPathActionType } from "./app/model";
import { ISelectBackendAction, ISelectFrontendAction } from "./frameworks/model";
import { ISetPageAction, IsetPagesAction } from "./pages/model";
import { ISelectProjectTypeAction } from "./projectType/model";
import ServicesActionType from "./services/actionTypes";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | IsetPagesAction
  | ISetPageAction
  | ISelectProjectTypeAction
  | ISetProjectNameActionType
  | IUpdateProjectPathActionType
  | ServicesActionType;

export default WizardSelectionActionType;
