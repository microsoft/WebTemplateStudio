import { ISelectFrontendAction, ISelectBackendAction } from "./frameworks/model";
import { IsetPagesAction, ISetPageAction, IResetPagesAction } from "./pages/model";
import { ISelectProjectTypeAction, ISetProjectNameActionType, IUpdateProjectPathActionType } from "./app/model";

type WizardSelectionActionType =
  | ISelectBackendAction
  | ISelectFrontendAction
  | IsetPagesAction
  | ISetPageAction
  | ISelectProjectTypeAction
  | ISetProjectNameActionType
  | IUpdateProjectPathActionType
  | IResetPagesAction;

export default WizardSelectionActionType;
