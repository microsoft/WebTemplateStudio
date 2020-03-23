import { IVersionData } from "../versions/model";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "../generationStatus/model";

import { ISetVisitedPage, IResetVisitedPage, ISetPage, ISetDetails } from "./pages/model";
import { IResetWizard, IUpdateDependencyInfo } from "./wizard/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPage
  | IResetVisitedPage
  | ISetPage
  | IUpdateGenStatus
  | IResetWizard
  | IUpdateGenStatusMessage
  | IUpdateDependencyInfo;

export default WizardInfoType;
