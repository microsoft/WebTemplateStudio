import { IProjectTypesActionType } from "./getProjectTypes";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType, IBackendFrameworksSuccessActionType } from "../../store/wizardContent/frameworks/model";
import { IPageOptionsActionType } from "../../store/wizardContent/pages/model";
import { IPreviewStatusActionType } from "../../store/wizardContent/wizard/model";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IUpdateFrameworkActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IPreviewStatusActionType;

export default WizardContentActionType;
