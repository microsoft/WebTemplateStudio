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

const WEST_US: string = "WEST US";
const RESOURCE_GROUP_MOCK: string = "resourceGroupMock";

const DEV_NO_ERROR_MSG: string = "in development, no error message";
const DEV_NO_ERROR_TYPE: string = "in development, no error type";

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
            isAvailable: message.appName.length > 0
          },
          message: DEV_NO_ERROR_MSG,
          errorType: DEV_NO_ERROR_TYPE
        });
        break;
      case EXTENSION_COMMANDS.NAME_COSMOS:
        //@ts-ignore
        window.postMessage({
          command: EXTENSION_COMMANDS.NAME_COSMOS,
          payload: {
            isAvailable: message.appName.length > 0
          },
          message: DEV_NO_ERROR_MSG,
          errorType: DEV_NO_ERROR_TYPE
        });
        break;
      case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
        // @ts-ignore produces locations and resource groups in development
        window.postMessage({
          command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS,
          payload: {
            locations: [{ label: WEST_US, value: WEST_US }],
            resourceGroups: [
              { label: RESOURCE_GROUP_MOCK, value: RESOURCE_GROUP_MOCK }
            ]
          }
        });
      case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
        // @ts-ignore produces locations and resource groups in development
        window.postMessage({
          command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS,
          payload: {
            locations: [{ label: WEST_US, value: WEST_US }],
            resourceGroups: [
              { label: RESOURCE_GROUP_MOCK, value: RESOURCE_GROUP_MOCK }
            ]
          }
        });
        break;
      case EXTENSION_COMMANDS.GENERATE:
        // @ts-ignore produces a mock generate response from VSCode in development 
        window.postMessage({
          command: EXTENSION_COMMANDS.PROJECT_PATH_AND_NAME_VALIDATION,
          payload: {
            validation: {
              isValidProjectName: false,
              projectNameError: "project name is invalid",
              isValidProjectPath: false,
              projectPathError: "project path is invalid"
            }
          }
        });
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
