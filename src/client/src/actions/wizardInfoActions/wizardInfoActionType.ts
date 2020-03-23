import { IVersionData } from "../../store/versions/model";
import { ISetDetails } from "./setDetailsPage";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "../../store/generationStatus/model";
import { IResetWizard } from "./resetWizardAction";
import { IUpdateDependencyInfo } from "./updateDependencyInfo";
import { ISetVisitedPage, IResetVisitedPage, ISetPage } from "../../store/wizardContent/pages/model";

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
