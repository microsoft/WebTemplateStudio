import { ISelectFrontendAction, ISelectBackendAction } from "./frameworks/model";
import { IsetPagesAction, ISetPageAction } from "./pages/model";
import { ISetProjectNameActionType, IUpdateProjectPathActionType } from "./app/model";
import ServicesActionType from "./services/actionTypes";
import {ISelectProjectTypeAction} from "./projectType/model";

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
