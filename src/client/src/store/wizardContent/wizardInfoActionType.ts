import { IVersionData } from "../versions/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails } from "./pages/model";
import { IResetWizardAction, IUpdateDependencyInfoAction } from "./wizardContent/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction
  | IResetWizardAction
  | IUpdateDependencyInfoAction;

export default WizardInfoType;
