import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import RootAction from "../../actions/ActionType";

export interface IStatus {
  success: boolean;
  failure: boolean;
}

export interface IServiceStatus {
  [key: string]: IStatus;
}

const initialState = {
  templates: {
    success: false,
    failure: false
  },
  cosmos: {
    success: false,
    failure: false
  },
  azureFunctions: {
    success: false,
    failure: false
  },
  appService: {
    success: false,
    failure: false
  }
};

const genStatus = (
  state: IServiceStatus = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export { genStatus };
