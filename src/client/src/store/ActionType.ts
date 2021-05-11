import AzureActionType from "./config/azure/azureActionType";
import ConfigType from "./config/configType";
import NavigationActionType from "./navigation/navigationActionType";
import TemplatesActionType from "./templates/templatesActionType";
import UserSelectionActionType from "./userSelection/selectionActionType";

type RootAction = AzureActionType | ConfigType | NavigationActionType | TemplatesActionType | UserSelectionActionType;

export default RootAction;
