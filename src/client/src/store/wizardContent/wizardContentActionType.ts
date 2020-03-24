import { IUpdateFrameworkActionType, IFrontendFrameworksActionType, IBackendFrameworksSuccessActionType } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionType } from "./wizard/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
