import { IVersionData } from "../../store/versions/model";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "../../store/generationStatus/model";
import { IResetWizard } from "./resetWizardAction";
import { IUpdateDependencyInfo } from "./updateDependencyInfo";
import { ISetVisitedPage, IResetVisitedPage, ISetPage, ISetDetails } from "../../store/wizardContent/pages/model";

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
