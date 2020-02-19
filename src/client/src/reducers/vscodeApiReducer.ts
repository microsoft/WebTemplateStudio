import { VSCODE_TYPEKEYS } from "../actions/vscodeApiActions/typeKeys";
import { PRODUCTION } from "../utils/constants";
import mockVsCodeApi from "../mockData/mockVsCodeApi";
import { IVSCodeAPIActionType } from "../actions/vscodeApiActions/getVSCodeApi";

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

export interface IVSCodeAPI {
  isVsCodeApiAcquired: boolean;
  vscodeObject: IVSCodeObject;
}

function vscodeApi(
  state: IVSCodeAPI = {
    isVsCodeApiAcquired: false,
    vscodeObject: mockVsCodeApi()
  },
  action: IVSCodeAPIActionType
) {
  switch (action.type) {
    case VSCODE_TYPEKEYS.GET_VSCODE_API:
      if (!state.isVsCodeApiAcquired) {
        const newState = { ...state };
        newState.isVsCodeApiAcquired = true;
        newState.vscodeObject =
          process.env.NODE_ENV === PRODUCTION
            ? //
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
