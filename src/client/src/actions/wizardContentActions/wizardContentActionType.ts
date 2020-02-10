import { IBackendFrameworksSuccessActionType } from "./setBackendFrameworks";
import { IFrontendFrameworksActionType } from "./setFrontendFrameworks";
import { IUpdateFrameworkActionType } from "./updateFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypes";
import { IPreviewStatusActionType } from "./setPreviewStatus";
import { ISetPortActionType } from "./setPort";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType
  | ISetPortActionType;

export default WizardContentActionType;
