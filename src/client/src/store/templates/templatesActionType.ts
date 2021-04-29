import { IFeaturesActionType } from "./features/models";
import {
  IBackendFrameworksSuccessActionTypeAction,
  IFrontendFrameworksActionTypeAction,
  IUpdateFrameworkActionTypeAction,
} from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionTypeAction
  | IFrontendFrameworksActionTypeAction
  | IUpdateFrameworkActionTypeAction
  | IPageOptionsActionType
  | IFeaturesActionType;

export default WizardContentActionType;
