import { IVersionData } from "../config/versions/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction } from "./pages/model";

type WizardInfoType =
  | IVersionData
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction;

export default WizardInfoType;
