import { ISelectFrontendAction, ISelectBackendAction } from "./frameworks/model";
import { IsetPagesAction, ISetPageAction } from "./pages/model";
import { ISelectProjectTypeAction, ISetProjectNameActionType, IUpdateProjectPathActionType } from "./app/model";
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
