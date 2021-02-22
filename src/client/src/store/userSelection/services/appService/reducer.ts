import RootAction from "../../../ActionType";
import { AZURE_TYPEKEYS } from "../../../config/azure/typeKeys";
import { CONFIG_TYPEKEYS } from "../../../config/configTypeKeys";
import { SERVICES_TYPEKEYS } from "../typeKeys";
import { IAppService } from "./model";

const initialState: IAppService | null = null;

const appServiceReducer = (state: IAppService | null = initialState, action: RootAction): IAppService | null => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.RESET_WIZARD:
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
    case SERVICES_TYPEKEYS.REMOVE_APP_SERVICE:
      return initialState;
    case SERVICES_TYPEKEYS.SAVE_APP_SERVICE:
      return {
        subscription: action.payload.subscription,
        resourceGroup: action.payload.resourceGroup,
        location: action.payload.location,
        internalName: action.payload.internalName,
        icon: action.payload.icon,
        siteName: action.payload.siteName,
        editable: action.payload.editable,
      };
    default:
      return state;
  }
};

export default appServiceReducer;
