import { WIZARD_INFO_TYPEKEYS } from "../typeKeys";
import RootAction from "../ActionType";
import { IServiceStatus } from "./model";


const initialState = {
  templates: {
    success: false,
    failure: false
  },
  cosmos: {
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
