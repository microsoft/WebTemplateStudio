import { IVersionData } from "./getVersionData";
import { ISetDetails } from "./setDetailsPage";
import { ISetVisitedPage } from "./setVisitedWizardPage";
import { IUpdateCreateProjectButton } from "./updateCreateProjectButton";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "./updateGenStatusActions";
import { IResetWizard } from "./resetWizardAction";
import { IUpdateDependencyInfo } from "./updateDependencyInfo";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPage
  | IUpdateGenStatus
  | IResetWizard
  | IUpdateGenStatusMessage
  | IUpdateDependencyInfo
  | IUpdateCreateProjectButton;

export default WizardInfoType;
