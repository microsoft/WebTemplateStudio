import { IBackendFrameworksSuccessActionType } from "./getBackendFrameworks";
import { IFrontendFrameworksActionType } from "./getFrontendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypesSuccess";
import { IPreviewStatusActionType } from "./setPreviewStatus";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
