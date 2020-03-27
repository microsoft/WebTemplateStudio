import { IVersionData } from "../versions/model";
import {
  IUpdateGenStatusMessageAction,
  IUpdateGenStatusAction
} from "../generationStatus/model";

import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails } from "./pages/model";
import { IResetWizard, IUpdateDependencyInfo } from "./wizardContent/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPageAction
  | IResetVisitedPageAction
  | ISetPageAction
  | IUpdateGenStatusAction
  | IResetWizard
  | IUpdateGenStatusMessageAction
  | IUpdateDependencyInfo;

export default WizardInfoType;
