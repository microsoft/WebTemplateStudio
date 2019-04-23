import { IBackendFrameworksSuccessActionType } from "./getBackendFrameworks";
import { IFrontendFrameworksActionType } from "./getFrontendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypesSuccess";
import { IPreviewStatusActionType } from "./setPreviewStatus";
import { ISetPortActionType } from "./setPort";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType
  | ISetPortActionType;

export default WizardContentActionType;
