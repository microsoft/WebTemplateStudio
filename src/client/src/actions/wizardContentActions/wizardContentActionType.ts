import { IBackendFrameworksSuccessActionType } from "./setBackendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypes";
import { IPreviewStatusActionType } from "./setPreviewStatus";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType } from "../../store/wizardContent/frameworks/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
