import { IUpdateFrameworkActionTypeAction, IFrontendFrameworksActionTypeAction, IBackendFrameworksSuccessActionTypeAction } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionTypeAction
  | IFrontendFrameworksActionTypeAction
  | IUpdateFrameworkActionTypeAction
  | IPageOptionsActionType;

export default WizardContentActionType;
