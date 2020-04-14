import AzureActionType from "./azureProfileData/azureActionType";
import ConfigType from "./config/configType";
import NavigationActionType from "./navigation/navigationActionType";
import WizardContentActionType from "./templates/templatesActionType";
import WizardSelectionActionType from "./userSelection/selectionActionType";
import WizardInfoActionType from "./templates/templatesType";

type RootAction =
  | AzureActionType
  | ConfigType
  | NavigationActionType
  | WizardContentActionType
  | WizardSelectionActionType
  | WizardInfoActionType;

export default RootAction;