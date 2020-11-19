import {
  DEVELOPMENT,
  TEST,
} from "../utils/constants/constants";

import * as mockAzureModule from "./extensionModules/mockAzureModule";
import * as mockCoreTSModule from "./extensionModules/mockCoreTSModule";
import * as mockLoggerModule from "./extensionModules/mockLoggerModule";
import * as mockGenerationModule from "./extensionModules/mockGenerationModule";
import { EXTENSION_COMMANDS } from "../utils/constants/commands";

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 *
 * Mimics VSCode API by using native postMessage API to mimic postMessage from
 * VSCode.
 */
const mockVsCodeApi = (platform: string) => ({
  postMessage: (message: any) => {
    if (process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST) {
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_FRAMEWORKS:
          mockCoreTSModule.getFrameworks(platform, message);
          break;
        case EXTENSION_COMMANDS.GET_LATEST_VERSION:
            const latestVersion = "v3.1.5";
            window.postMessage(
              {
                command: EXTENSION_COMMANDS.GET_LATEST_VERSION,
                payload: {
                  scope:message.payload && message.payload.scope ? message.payload.scope : "",
                  latestVersion,
                }
              },
              "*"
            );
            break;
        case EXTENSION_COMMANDS.GET_PAGES:
          mockCoreTSModule.getPages(platform, message);
          break;
        case EXTENSION_COMMANDS.GET_FEATURES:
          mockCoreTSModule.getFeatures(message);
          break;
        case EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME:
          mockAzureModule.validateCosmosName(message);
          break;
        case EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME:
          mockAzureModule.validateAppServiceName(message);
          break;
        case EXTENSION_COMMANDS.GET_RESOURCE_GROUPS:
          mockAzureModule.getResourceGroups(message);
          break;
        case EXTENSION_COMMANDS.GET_LOCATIONS:
          mockAzureModule.getLocations(message);
          break;
        case EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME:
          mockAzureModule.getValidAppServiceName(message);
          break;
        case EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME:
          mockAzureModule.getValidCosmosName(message);
          break;
        case EXTENSION_COMMANDS.GENERATE:
          mockGenerationModule.generate(message);
          break;
        case EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE:
          mockGenerationModule.openProjectVSCode(message);
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH_FROM_CONFIG:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_OUTPUT_PATH_FROM_CONFIG,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                outputPath: "/generic_output_path"
              }
            },
            "*"
          );
          break;
          case EXTENSION_COMMANDS.BROWSE_NEW_OUTPUT_PATH:
            window.postMessage(
              {
                command: EXTENSION_COMMANDS.BROWSE_NEW_OUTPUT_PATH,
                payload: {
                  scope:message.payload && message.payload.scope ? message.payload.scope : "",
                  outputPath: "/new_generic_output_path"
                }
              },
              "*"
            );
            break;
        case EXTENSION_COMMANDS.GET_TEMPLATE_INFO:
          mockCoreTSModule.getTemplateConfig(platform, message);
          break;
          case EXTENSION_COMMANDS.GET_PROJECT_TYPES:
            mockCoreTSModule.getProjectTypes(message);
              break;
          case EXTENSION_COMMANDS.GET_ALL_LICENSES:
              mockCoreTSModule.getAllLicenses(message);
                break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          break;
          case EXTENSION_COMMANDS.AZURE_LOGIN:
            mockAzureModule.login(message);
            break;
            case EXTENSION_COMMANDS.AZURE_LOGOUT:
              mockAzureModule.logout(message);
              break;
        case EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION:
          // produces a mock validation response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                projectPathValidation: {
                  isValid: true,
                  error: ""
                }
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.LOG:
          mockLoggerModule.logFromWizard(message);
          break;
        case EXTENSION_COMMANDS.OPEN_LOG:
          mockLoggerModule.openLog();
          break;
      }
    }
  }
});

export default mockVsCodeApi;