import { IBackendFrameworksSuccessActionType } from "./getBackendFrameworks";
import { IFrontendFrameworksActionType } from "./getFrontendFrameworks";
import { IPageOptionsActionType } from "./getPagesOptions";
import { IProjectTypesActionType } from "./getProjectTypesSuccess";

type WizardContentActionType =
  | IBackendFrameworksSuccessActionType
  | IFrontendFrameworksActionType
  | IPageOptionsActionType
  | IProjectTypesActionType;

export default WizardContentActionType;
