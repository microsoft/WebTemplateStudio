import AzureActionType from "./azureProfileData/azureActionType";
import ConfigType from "./config/configType";
import ModalActionType from "./navigation/modals/modalActionType";
import RoutesActionType from "./navigation/routes/routesActionType";
import WizardContentActionType from "./templates/templatesActionType";
import WizardSelectionActionType from "./userSelection/selectionActionType";
import WizardInfoActionType from "./templates/templatesType";

type RootAction =
  | AzureActionType
  | ConfigType
  | ModalActionType
  | RoutesActionType
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;