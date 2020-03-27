import { IUpdateFrameworkActionTypeAction, IFrontendFrameworksActionTypeAction, IBackendFrameworksSuccessActionTypeAction } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionTypeAction } from "./wizardContent/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionTypeAction
  | IFrontendFrameworksActionTypeAction
  | IUpdateFrameworkActionTypeAction
  | IPageOptionsActionType
  | IPreviewStatusActionTypeAction;

export default WizardContentActionType;
