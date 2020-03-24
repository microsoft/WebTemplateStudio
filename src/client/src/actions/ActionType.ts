import AzureActionType from "../store/azure/azureActionType";
import ModalActionType from "../store/modals/modalActionType";
import VSCodeActionTypes from "../store/vscode/VSCodeActionType";
import WizardContentActionType from "../store/wizardContent/wizardContentActionType";
import WizardSelectionActionType from "../store/selection/selectionActionType";
import WizardInfoActionType from "../store/wizardContent/wizardInfoActionType";

type RootAction =
  | AzureActionType
  | ModalActionType
  | VSCodeActionTypes
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;