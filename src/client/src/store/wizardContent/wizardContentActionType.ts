import { IProjectTypesActionType } from "./getProjectTypes";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType, IBackendFrameworksSuccessActionType } from "./frameworks/model";
import { IPageOptionsActionType } from "./pages/model";
import { IPreviewStatusActionType } from "./wizard/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
