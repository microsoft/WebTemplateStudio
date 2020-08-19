import { IVSCodeObject } from "../../types/vscode";
import { PAYLOAD_MESSAGES_TEXT } from "../constants/constants";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../constants/internalNames";
import { ILoggingPayload } from "../../types/logger";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../constants/commands";

const postMessageAsync = (command: string, paramsMessage: any, vscode: IVSCodeObject, scopeId: number = Math.random())=>{
  const promise = new Promise<any>((resolve) => {
    paramsMessage.payload = paramsMessage.payload || {};
    paramsMessage.payload.scope = scopeId;
    const callbackVsCode = (event: any) =>{
      if (event.data.command === command){
        if (event.data.payload && event.data.payload.scope === scopeId){
          resolve(event);
          window.removeEventListener("message",callbackVsCode);
        }
      }
    }

    window.addEventListener("message", callbackVsCode);
    vscode.postMessage(paramsMessage);
  });
  return promise;
};

const projectPathValidation = (projectPath: string, projectName: string, vscode: IVSCodeObject): Promise<any> => {
  const promise: Promise<any> = postMessageAsync(EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION, {
    module: EXTENSION_MODULES.VALIDATOR,
    command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
    track: false,
    projectPath,
    projectName
  }, vscode);
  return promise;
}

const getFrameworks = (vscode: IVSCodeObject, isPreview: boolean, projectType: string): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_FRAMEWORKS, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
    payload: { projectType }
  }, vscode);
}

const getProjectTypes = (vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_PROJECT_TYPES, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_PROJECT_TYPES
  }, vscode);
}

const getTemplateInfo = (vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_TEMPLATE_INFO, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_TEMPLATE_INFO,
    payload: {}
  }, vscode);
}

const getLatestVersion = (vscode: IVSCodeObject, checkVersionPackageName: string, checkVersionPackageSource: string): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_LATEST_VERSION, {
    module: EXTENSION_MODULES.DEPENDENCYCHECKER,
    command: EXTENSION_COMMANDS.GET_LATEST_VERSION,
    payload: {
      checkVersionPackageName,
      checkVersionPackageSource
    }
  }, vscode).then((event)=>{
    const latestVersion = event.data.payload.latestVersion;
    return latestVersion;
  });
}

const getDependencyInfo = (vscode: IVSCodeObject, dependency: string): Promise<{dependency: string; installed: boolean}> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_DEPENDENCY_INFO, {
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: { dependency },
    }, vscode).then((event) => {
    const { dependency, installed } = event.data.payload;
    return {
      dependency,
      installed,
    };
  });
};

const getPages = (vscode: IVSCodeObject, projectType: string, frontEndInternalName: string, backEndInternalName: string)=>{
  return postMessageAsync( EXTENSION_COMMANDS.GET_PAGES, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_PAGES,
    payload: {
      projectType,
      frontendFramework: frontEndInternalName,
      backendFramework: backEndInternalName
    }
  }, vscode);
}

const getFeatures = (vscode: IVSCodeObject, frontEndInternalName: string, backEndInternalName: string)=>{
  return postMessageAsync( EXTENSION_COMMANDS.GET_FEATURES, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_FEATURES,
    payload: {
      projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
      frontendFramework: frontEndInternalName,
      backendFramework: backEndInternalName
    }
  }, vscode);
}

const getOutputPath = (vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_OUTPUT_PATH, {
    module: EXTENSION_MODULES.DEFAULTS,
    command: EXTENSION_COMMANDS.GET_OUTPUT_PATH
  }, vscode);
}

const azureLogout = (vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.AZURE_LOGOUT, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.AZURE_LOGOUT,
    track: true
  }, vscode);
}

const azureLogin = (vscode: IVSCodeObject)=>{
  return postMessageAsync(EXTENSION_COMMANDS.AZURE_LOGIN, {
    command: EXTENSION_COMMANDS.AZURE_LOGIN,
    module: EXTENSION_MODULES.AZURE,
    track: true
  }, vscode);
}

const getUserStatus = (vscode: IVSCodeObject)=>{
  return postMessageAsync(EXTENSION_COMMANDS.GET_USER_STATUS, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_USER_STATUS,
    track: true
  }, vscode);
}

const sendTelemetry = (vscode: IVSCodeObject, command: string, payload?: any): void =>
{
  vscode.postMessage({
    module: EXTENSION_MODULES.TELEMETRY,
    command,
    ...payload
  });
}

const GetValidAppServiceName = (projectName: string, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME,
    projectName
  }, vscode);
}

const GetValidCosmosAccountName = (projectName: string, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME,
    projectName
  }, vscode);
}

const ValidateAppServiceName = (subscription: string, appName: string, scopeId: number, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME,
    subscription,
    appName
  }, vscode, scopeId);
}

const ValidateCosmosAccountName = (subscription: string, appName: string, scopeId: number, vscode: IVSCodeObject) =>{
  return postMessageAsync(EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME,
    track: false,
    appName,
    subscription
  }, vscode, scopeId);
}

const generateProject = (genrationData: any,vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.GENERATE, {
    module: EXTENSION_MODULES.GENERATE,
    command: EXTENSION_COMMANDS.GENERATE,
    track: false,
    text: PAYLOAD_MESSAGES_TEXT.SENT_GENERATION_INFO_TEXT,
    payload: genrationData
  }, vscode);
}

const getAllLicenses = (licenseData: any,vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_ALL_LICENSES, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_ALL_LICENSES,
    track: false,
    text: PAYLOAD_MESSAGES_TEXT.SENT_GENERATION_INFO_TEXT,
    payload: licenseData
  }, vscode);
}

const getLocations = (vscode: IVSCodeObject, subscription: string, azureServiceType: string) => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_LOCATIONS, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_LOCATIONS,
    track: true,
    subscription,
    azureServiceType
  }, vscode);
}

const getResourceGroups = (vscode: IVSCodeObject, subscription: string) => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_RESOURCE_GROUPS, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_RESOURCE_GROUPS,
    track: true,
    subscription
  }, vscode);
}

const sendLog = (logData: ILoggingPayload, vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.LOG, {
    module: EXTENSION_MODULES.LOGGER,
    command: EXTENSION_COMMANDS.LOG,
    logData
  }, vscode);
}

const openLogFile = (vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.OPEN_LOG, {
    module: EXTENSION_MODULES.LOGGER,
    command: EXTENSION_COMMANDS.OPEN_LOG,
  }, vscode);
}

const openProjectInVSCode = (outputPath: string, vscode: IVSCodeObject) => {
  return vscode.postMessage({
    module: EXTENSION_MODULES.GENERATE,
    command: EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE,
    track: true,
    payload: {
      outputPath,
    },
  });
}

const subscribeToExtensionEvents = (listener: any) => {
  window.addEventListener("message", listener);
}

const unsubscribeToExtensionEvents = (listener: any) => {
  window.removeEventListener("message", listener);
}

export {
  projectPathValidation,
  getFrameworks,
  getProjectTypes,
  getAllLicenses,
  getLatestVersion,
  getDependencyInfo,
  getPages,
  getFeatures,
  getOutputPath,
  sendTelemetry,
  getResourceGroups,
  GetValidAppServiceName,
  GetValidCosmosAccountName,
  ValidateAppServiceName,
  azureLogout,
  getLocations,
  ValidateCosmosAccountName,
  azureLogin,
  getUserStatus,
  getTemplateInfo,
  generateProject,
  sendLog,
  openLogFile,
  openProjectInVSCode,
  subscribeToExtensionEvents,
  unsubscribeToExtensionEvents
}
