import AzureActionType from "./azureActions/azureActionType";
import ModalActionType from "../store/modals/modalActionType";
import VSCodeActionTypes from "./vscodeApiActions/VSCodeActionType";
import WizardContentActionType from "./wizardContentActions/wizardContentActionType";
import WizardSelectionActionType from "../store/selection/selectionActionType";
import WizardInfoActionType from "./wizardInfoActions/wizardInfoActionType";

type RootAction =
  | AzureActionType
  | ModalActionType
  | VSCodeActionTypes
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;
