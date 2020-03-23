import { IVersionData } from "../../store/versions/model";
import { ISetDetails } from "./setDetailsPage";
import { ISetVisitedPage, IResetVisitedPage } from "./setVisitedWizardPage";
import { ISetPage } from "./setPageWizardPage";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "../../store/generationStatus/model";
import { IResetWizard } from "./resetWizardAction";
import { IUpdateDependencyInfo } from "./updateDependencyInfo";

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
