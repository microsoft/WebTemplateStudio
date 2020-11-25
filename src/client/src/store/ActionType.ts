import AzureActionType from "./config/azure/azureActionType";
import ConfigType from "./config/configType";
import NavigationActionType from "./navigation/navigationActionType";
import UserSelectionActionType from "./userSelection/selectionActionType";
import TemplatesActionType from "./templates/templatesActionType";

type RootAction = AzureActionType | ConfigType | NavigationActionType | TemplatesActionType | UserSelectionActionType;

export default RootAction;
