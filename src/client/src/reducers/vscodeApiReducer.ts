import * as Actions from "../actions/types";
import { PRODUCTION } from "../utils/constants";

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

interface IVSCodeAPI {
  isVsCodeApiAcquired: boolean;
  vscodeObject: any;
}

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 *
 * Returns type "any" because the VSCode API type is not known in the client.
 */
const mockVsCodeApi = (): any => ({
  postMessage: (message: any) => {
    switch (message.command) {
      case "alert":
        console.log("Command: ", message.alert);
        break;
    }
  }
});

function vscodeApi(
  state = {
    isVsCodeApiAcquired: false,
    vscodeObject: undefined
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
