import AzureActionType from "./azureProfileData/azureActionType";
import ModalActionType from "./modals/modalActionType";
import WizardContentActionType from "./templates/wizardContentActionType";
import WizardSelectionActionType from "./selection/selectionActionType";
import WizardInfoActionType from "./templates/wizardInfoActionType";

type RootAction =
  | AzureActionType
  | ModalActionType
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;