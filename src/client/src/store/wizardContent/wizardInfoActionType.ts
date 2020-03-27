import { IVersionData } from "../versions/model";
import {
  IUpdateGenStatusMessageAction,
  IUpdateGenStatusAction
} from "../generationStatus/model";

import { ISetVisitedPage, IResetVisitedPage, ISetPage, ISetDetails } from "./pages/model";
import { IResetWizard, IUpdateDependencyInfo } from "./wizardContent/model";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPage
  | IResetVisitedPage
  | ISetPage
  | IUpdateGenStatusAction
  | IResetWizard
  | IUpdateGenStatusMessageAction
  | IUpdateDependencyInfo;

export default WizardInfoType;
