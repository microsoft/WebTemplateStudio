import { IVersionData } from "./getVersionData";
import { ISetDetails } from "./setDetailsPage";
import { ISetVisitedPage, IResetVisitedPage } from "./setVisitedWizardPage";
import { ISetPage } from "./setPageWizardPage";
import { IUpdateCreateProjectButton } from "./updateCreateProjectButton";
import {
  IUpdateGenStatusMessage,
  IUpdateGenStatus
} from "./updateGenStatusActions";
import { IResetWizard } from "./resetWizardAction";
import { IUpdateDependencyInfo } from "./updateDependencyInfo";
import { IEnableQuickStart } from "./enableQuickStartAction";

type WizardInfoType =
  | IVersionData
  | ISetDetails
  | ISetVisitedPage
  | IResetVisitedPage
  | ISetPage
  | IUpdateGenStatus
  | IResetWizard
  | IUpdateGenStatusMessage
  | IUpdateDependencyInfo
  | IUpdateCreateProjectButton
  | IEnableQuickStart;

export default WizardInfoType;
