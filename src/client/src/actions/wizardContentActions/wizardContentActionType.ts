import { IProjectTypesActionType } from "./getProjectTypes";
import { IPreviewStatusActionType } from "./setPreviewStatus";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType, IBackendFrameworksSuccessActionType } from "../../store/wizardContent/frameworks/model";
import { IPageOptionsActionType } from "../../store/wizardContent/pages/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
