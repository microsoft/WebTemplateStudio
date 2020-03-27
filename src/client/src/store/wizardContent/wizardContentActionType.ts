import { IUpdateFrameworkActionTypeAction, IFrontendFrameworksActionTypeAction, IBackendFrameworksSuccessActionTypeAction } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionType } from "./wizardContent/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionTypeAction
  | IFrontendFrameworksActionTypeAction
  | IUpdateFrameworkActionTypeAction
  | IPageOptionsActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
