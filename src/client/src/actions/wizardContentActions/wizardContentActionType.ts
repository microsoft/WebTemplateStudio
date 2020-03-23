import { IBackendFrameworksSuccessActionType } from "./setBackendFrameworks";
import { IFrontendFrameworksActionType } from "./setFrontendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypes";
import { IPreviewStatusActionType } from "./setPreviewStatus";
import { IUpdateFrameworkActionType } from "../../store/wizardContent/frameworks/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
