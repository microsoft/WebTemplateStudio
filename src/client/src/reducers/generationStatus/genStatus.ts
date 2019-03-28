import * as Actions from "../../actions/types";

export interface IStatus {
  success: boolean;
  failure: boolean;
}

export interface IServiceStatus {
  [key: string]: IStatus;
}

export interface IGenStatus {
  genStatus: IServiceStatus;
}

const initialState = {
  genStatus: {
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
  }
};

const genStatus = (state: IGenStatus = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS:
      return {
        ...state,
        genStatus: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export { genStatus };
