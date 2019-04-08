import { IBackendFrameworksSuccessActionType } from "./getBackendFrameworks";
import { IFrontendFrameworksActionType } from "./getFrontendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypesSuccess";
import { IVSCodeAPIActionType } from "./getVSCodeApi";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IPageOptionsActionType
  | IProjectTypesActionType
  | IVSCodeAPIActionType;

export default WizardContentActionType;
