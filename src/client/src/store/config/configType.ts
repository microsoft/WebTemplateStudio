import { IVersionData } from "./versions/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails } from "./pages/model";
import { IResetWizardAction } from "./config/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction
  | IResetWizardAction;

export default WizardInfoType;
