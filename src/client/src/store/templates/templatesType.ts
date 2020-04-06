import { IVersionData } from "../versions/model";
import {
  IUpdateGenStatusMessageAction,
  IUpdateGenStatusAction
} from "../generationStatus/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails } from "./pages/model";
import { IResetWizardAction } from "./preview/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction
  | IUpdateGenStatusAction
  | IResetWizardAction
  | IUpdateGenStatusMessageAction;

export default WizardInfoType;
