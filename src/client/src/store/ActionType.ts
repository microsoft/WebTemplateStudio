import AzureActionType from "./azureProfileData/azureActionType";
import ModalActionType from "./navigation/modals/modalActionType";
import WizardContentActionType from "./templates/templatesActionType";
import WizardSelectionActionType from "./userSelection/selectionActionType";
import WizardInfoActionType from "./templates/templatesType";

type RootAction =
  | AzureActionType
  | ModalActionType
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;