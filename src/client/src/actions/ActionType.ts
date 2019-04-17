import AzureActionType from "./azureActions/azureActionType";
import ModalActionType from "./modalActions/modalActionType";
import VSCodeActionTypes from "./vscodeApiActions/VSCodeActionType";
import WizardContentActionType from "./wizardContentActions/wizardContentActionType";
import WizardSelectionActionType from "./wizardSelectionActions/wizardSelectionActionType";
import WizardInfoActionType from "./wizardInfoActions/wizardInfoActionType";

type RootAction =
  | AzureActionType
  | ModalActionType
  | VSCodeActionTypes
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;
