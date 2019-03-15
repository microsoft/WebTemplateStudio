import * as Actions from "../actions/types";
import { PRODUCTION } from "../utils/constants";
import { EXTENSION_COMMANDS } from "../utils/constants";

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
 * Mimics VSCode API by using native postMessage API to mimic postMessage from
 * VSCode.
 */
const mockVsCodeApi = () => ({
  postMessage: (message: any) => {
    switch (message.command) {
      case "alert":
        console.log("Command: ", message.alert);
        break;
      case EXTENSION_COMMANDS.NAME_FUNCTIONS:
        //@ts-ignore
        window.postMessage({
          command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
          payload: {
            isAvailable: message.appName.length > 0,
          },
          message: "in development, no error message",
          errorType: "in development, no error type"
        });
        break;
      case EXTENSION_COMMANDS.NAME_COSMOS:
        //@ts-ignore
        window.postMessage({
          command: EXTENSION_COMMANDS.NAME_COSMOS,
          payload: {
            isAvailable: message.appName.length > 0,
          },
          message: "in development, no error message",
          errorType: "in development, no error type"
        });
        break;
      case EXTENSION_COMMANDS.SUBSCRIPTION_DATA:
        // @ts-ignore produces locations and resource groups in development
        window.postMessage({
          command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA,
          payload: {
            locations: [{ label: "WEST US", value: "WEST US" }],
            resourceGroups: [
              { label: "resourceGroupMock", value: "resourceGroupMock" }
            ]
          }
        });
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
