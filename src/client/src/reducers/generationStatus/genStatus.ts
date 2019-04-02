import * as Actions from "../../actions/types";

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
  }
};

const genStatus = (state: IServiceStatus = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export { genStatus };
