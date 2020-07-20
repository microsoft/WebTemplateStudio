import { IUpdateFrameworkActionTypeAction, IFrontendFrameworksActionTypeAction, IBackendFrameworksSuccessActionTypeAction } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";
import { IFeaturesActionType } from "./features/models";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionTypeAction
  | IFrontendFrameworksActionTypeAction
  | IUpdateFrameworkActionTypeAction
  | IPageOptionsActionType
  | IFeaturesActionType;

export default WizardContentActionType;
