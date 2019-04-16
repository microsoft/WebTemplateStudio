import * as Actions from "../actions/types";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  PRODUCTION
} from "../utils/constants";
import mockVsCodeApi from "../mockData/mockVsCodeApi";

/* State Shape
{
    vscode: {
      isVsCodeApiAcquired: boolean,
      vscode: any
    }
}
*/

export interface IVSCode {
  vscode: IVSCodeAPI;
}

export interface IVSCodeObject {
  postMessage: (message: any) => void;
}

interface IVSCodeAPI {
  isVsCodeApiAcquired: boolean;
  vscodeObject: IVSCodeObject;
}

function vscodeApi(
  state: IVSCodeAPI = {
    isVsCodeApiAcquired: false,
    vscodeObject: mockVsCodeApi()
  },
  action: {
    type: string;
  }
) {
  switch (action.type) {
    case Actions.GET_VSCODE_API:
      if (!state.isVsCodeApiAcquired) {
        const newState = { ...state };
        newState.isVsCodeApiAcquired = true;
        newState.vscodeObject =
          process.env.NODE_ENV === PRODUCTION
            ? //
              // @ts-ignore because function does not exist in dev environment
              acquireVsCodeApi()
            : mockVsCodeApi();
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export default vscodeApi;
