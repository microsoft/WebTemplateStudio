import { IVersionData } from "./getVersionData";
import { ISetDetails } from "./setDetailsPage";
import { ISetVisitedPage } from "./setVisitedWizardPage";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "./updateGenStatusActions";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPage
  | IUpdateGenStatus
  | IUpdateGenStatusMessage;

export default WizardInfoType;
