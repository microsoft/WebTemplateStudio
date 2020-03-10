import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import {
  EXTENSION_COMMANDS, EXTENSION_MODULES, WIZARD_CONTENT_INTERNAL_NAMES, PAYLOAD_MESSAGES_TEXT
} from "../constants";

const postMessageAsync = (command: string, paramsMessage: any, vscode: IVSCodeObject)=>{

  const promise = new Promise<any>((resolve) => {
    const scope = Math.random();

    paramsMessage.payload = paramsMessage.payload || {};
    paramsMessage.payload.scope = scope;
    const callbackVsCode = (event: any) =>{
      if (event.data.command === command){
        if (event.data.payload && event.data.payload.scope === scope){
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

const getValidationsConfig = (paramsMessage: any, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_VALIDATIONS, paramsMessage, vscode);
}

const getFrameworks = (vscode: IVSCodeObject, isPreview: boolean): Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_FRAMEWORKS, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
    payload: {
      isPreview,
      projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
    }
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

const getPages = (vscode: IVSCodeObject, frontEndInternalName: string, backEndInternalName: string)=>{
  return postMessageAsync( EXTENSION_COMMANDS.GET_PAGES, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_PAGES,
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

const resetAllPages = (vscode: IVSCodeObject, internalName: string, pagesLength: number) => {
  return postMessageAsync(EXTENSION_COMMANDS.RESET_PAGES, {
    module: EXTENSION_MODULES.VSCODEUI,
    command: EXTENSION_COMMANDS.RESET_PAGES,
    track: true,
    text: PAYLOAD_MESSAGES_TEXT.RESET_PAGES_TEXT,
    payload: {
      internalName: internalName,
      pagesLength: pagesLength
    }
  }, vscode);
}

const azureLogout = (vscode: IVSCodeObject) => {
  return postMessageAsync(EXTENSION_COMMANDS.AZURE_LOGOUT, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.AZURE_LOGOUT,
    track: true
  }, vscode);
}

const subscriptionDataCosmos = (vscode: IVSCodeObject, subscription: string, projectName: string ) => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_COSMOS, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_COSMOS,
    track: true,
    subscription,
    projectName
  }, vscode);
}

const nameCosmos = (vscode: IVSCodeObject, subscription: string, appName: string) =>{
  return postMessageAsync(EXTENSION_COMMANDS.NAME_COSMOS, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.NAME_COSMOS,
    track: false,
    appName,
    subscription
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

const GetSubscriptionDataForAppService = (subscription: string, projectName: string, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_APP_SERVICE, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_APP_SERVICE,
    track: true,
    subscription,
    projectName
  }, vscode);
}

const GetValidAppServiceName = (projectName: string, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME,
    projectName
  }, vscode);
}

const ValidateAppServiceName = (subscription: string, appName: string, vscode: IVSCodeObject): Promise<any> => {
  return postMessageAsync(
    EXTENSION_COMMANDS.NAME_APP_SERVICE, {
    module: EXTENSION_MODULES.AZURE,
    command: EXTENSION_COMMANDS.NAME_APP_SERVICE,
    subscription,
    appName
  }, vscode);
}

export {
  projectPathValidation,
  getValidationsConfig,
  getFrameworks,
  getLatestVersion,
  getPages,
  getOutputPath,
  sendTelemetry,
  GetSubscriptionDataForAppService,
  GetValidAppServiceName,
  ValidateAppServiceName,
  resetAllPages,
  azureLogout,
  subscriptionDataCosmos,
  nameCosmos,
  azureLogin,
  getUserStatus,
  getTemplateInfo
}
