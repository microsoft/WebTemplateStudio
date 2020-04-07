import { IVersionData } from "../config/versions/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails } from "./pages/model";
import { IResetWizardAction } from "./preview/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction
  | IResetWizardAction;

export default WizardInfoType;
