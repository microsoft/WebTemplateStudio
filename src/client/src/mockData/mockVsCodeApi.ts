import {
  EXTENSION_COMMANDS,
  DEVELOPMENT,
  EXTENSION_MODULES
} from "../utils/constants";

const WEST_US: string = "WEST US";
const RESOURCE_GROUP_MOCK: string = "resourceGroupMock";
const RESOURCE_GROUP_MOCK_2: string = "resourceGroupMock2";
const RESOURCE_GROUP_MOCK_3: string = "resourceGroupMock3";
const RESOURCE_GROUP_MOCK_4: string = "resourceGroupMock4";
const RESOURCE_GROUP_MOCK_5: string = "resourceGroupMock5";
const RESOURCE_GROUP_MOCK_6: string = "resourceGroupMock6";
const RESOURCE_GROUP_MOCK_7: string = "resourceGroupMock7";
const RESOURCE_GROUP_MOCK_8: string = "resourceGroupMock8";
const RESOURCE_GROUP_MOCK_9: string = "resourceGroupMock9";
const RESOURCE_GROUP_MOCK_10: string = "resourceGroupMock10";
const RESOURCE_GROUP_MOCK_11: string = "resourceGroupMock11";

const DEV_NO_ERROR_MSG: string = "in development, no error message";
const DEV_NO_ERROR_TYPE: string = "in development, no error type";

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 *
 * Mimics VSCode API by using native postMessage API to mimic postMessage from
 * VSCode.
 */
const mockVsCodeApi = () => ({
  postMessage: (message: any) => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      switch (message.command) {
        case "alert":
          console.log("Command: ", message.alert);
          break;
        case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
              payload: {
                dependency: "node",
                installed: false
              }
            },
            "*"
          );
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
              payload: {
                dependency: "python",
                installed: false
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.NAME_FUNCTIONS:
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
              payload: {
                isAvailable: message.appName.length > 0
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.NAME_COSMOS:
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.NAME_COSMOS,
              payload: {
                isAvailable: message.appName.length > 0
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS,
              payload: {
                locations: [{ label: WEST_US, value: WEST_US }],
                resourceGroups: [
                  { label: RESOURCE_GROUP_MOCK, value: RESOURCE_GROUP_MOCK },
                  {
                    label: RESOURCE_GROUP_MOCK_2,
                    value: RESOURCE_GROUP_MOCK_2
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_3,
                    value: RESOURCE_GROUP_MOCK_3
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_4,
                    value: RESOURCE_GROUP_MOCK_4
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_5,
                    value: RESOURCE_GROUP_MOCK_5
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_6,
                    value: RESOURCE_GROUP_MOCK_6
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_7,
                    value: RESOURCE_GROUP_MOCK_7
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_8,
                    value: RESOURCE_GROUP_MOCK_8
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_9,
                    value: RESOURCE_GROUP_MOCK_9
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_10,
                    value: RESOURCE_GROUP_MOCK_10
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_11,
                    value: RESOURCE_GROUP_MOCK_11
                  }
                ]
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS,
              payload: {
                locations: [{ label: WEST_US, value: WEST_US }],
                resourceGroups: [
                  { label: RESOURCE_GROUP_MOCK, value: RESOURCE_GROUP_MOCK },
                  {
                    label: RESOURCE_GROUP_MOCK_2,
                    value: RESOURCE_GROUP_MOCK_2
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_3,
                    value: RESOURCE_GROUP_MOCK_3
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_4,
                    value: RESOURCE_GROUP_MOCK_4
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_5,
                    value: RESOURCE_GROUP_MOCK_5
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_6,
                    value: RESOURCE_GROUP_MOCK_6
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_7,
                    value: RESOURCE_GROUP_MOCK_7
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_8,
                    value: RESOURCE_GROUP_MOCK_8
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_9,
                    value: RESOURCE_GROUP_MOCK_9
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_10,
                    value: RESOURCE_GROUP_MOCK_10
                  },
                  {
                    label: RESOURCE_GROUP_MOCK_11,
                    value: RESOURCE_GROUP_MOCK_11
                  }
                ]
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GENERATE:
          // @ts-ignore mocks a generation status message
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS_MESSAGE,
              payload: {
                status: "updated status message..."
              }
            },
            "*"
          );
          // @ts-ignore mocks a generation status object
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS,
              payload: {
                templates: {
                  success: false,
                  failure: true
                },
                cosmos: {
                  success: true,
                  failure: false
                },
                azureFunctions: {
                  success: true,
                  failure: false
                }
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_OUTPUT_PATH,
              payload: {
                outputPath: "/generic_output_path"
              }
            },
            "*"
          );
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_PREVIEW_STATUS,
              payload: {
                preview: true
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_VERSIONS:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_VERSIONS,
              payload: {
                wizardVersion: "1.x",
                templatesVersion: "1.x"
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          break;
        case EXTENSION_COMMANDS.AZURE_LOGIN:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: "login",
              payload: {
                email: "devEnvironment2@email.com",
                subscriptions: [
                  { value: "GIV.Hackathon", label: "GIV.Hackathon" }
                ]
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION:
          // produces a mock validation response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
              payload: {
                projectPathValidation: {
                  isValid: true,
                  error: ""
                }
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.RESET_PAGES:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.RESET_PAGES,
              payload: {
                internalName: message.payload.internalName,
                resetPages: true
              }
            },
            "*"
          );
      }
    }
  }
});

export default mockVsCodeApi;
