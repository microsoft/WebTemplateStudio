import { AZURE_TYPEKEYS } from "../../../config/azure/typeKeys";
import { SERVICES_TYPEKEYS } from "../typeKeys";
import { IAppService } from "./model";
import RootAction from "../../../ActionType";
import { CONFIG_TYPEKEYS } from "../../../config/configTypeKeys";

const initialState: IAppService | null = null;

const appServiceReducer = (state: IAppService | null = initialState, action: RootAction) => {
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
        svgBase64: action.payload.svgBase64,
        siteName: action.payload.siteName,
        editable: action.payload.editable,
      };
    default:
      return state;
  }
};

export default appServiceReducer;
