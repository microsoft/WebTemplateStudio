const GET_VSCODE_API = "WTS/vscode/GET_VSCODE_API";

// Obtaining wizard data from engine
const GET_WEB_APP_OPTIONS = "WTS/wizardContent/GET_WEB_APP_OPTIONS";
const GET_WEB_APP_OPTIONS_SUCCESS = "WTS/wizardContent/GET_WEB_APP_OPTIONS_SUCCESS";
const GET_PAGES_OPTIONS = "WTS/wizardContent/GET_PAGES_OPTIONS";
const GET_PAGES_OPTIONS_SUCCESS = "WTS/wizardContent/GET_PAGES_OPTIONS_SUCCESS";
const GET_FRONTEND_FRAMEWORKS = "WTS/wizardContent/GET_FRONTEND_FRAMEWORKS";
const GET_FRONTEND_FRAMEWORKS_SUCCESS = "WTS/wizardContent/GET_FRONTEND_FRAMEWORKS_SUCCESS";
const GET_BACKEND_FRAMEWORKS = "WTS/wizardContent/GET_BACKEND_FRAMEWORKS";
const GET_BACKEND_FRAMEWORKS_SUCCESS = "WTS/wizardContent/GET_BACKEND_FRAMEWORKS_SUCCESS";
const LOAD_WIZARD_CONTENT = "WTS/wizardContent/LOAD_WIZARD_CONTENT";

// Wizard selection actions
const SELECT_FRONTEND_FRAMEWORK = "WTS/wizardSelections/SELECT_FRONTEND_FRAMEWORK";
const SELECT_BACKEND_FRAMEWORK = "WTS/wizardSelections/SELECT_BACKEND_FRAMEWORK";
const SELECT_PAGES = "WTS/wizardSelections/SELECT_PAGES";
const SELECT_WEB_APP = "WTS/wizardSelections/SELECT_WEB_APP";

// Azure actions
const IS_LOGGED_IN_TO_AZURE = "WTS/azure/IS_LOGGED_IN_TO_AZURE";
const LOG_IN_TO_AZURE = "WTS/azure/LOG_IN_TO_AZURE";
const SET_LOGGED_IN_TO_TRUE = "WTS/azure/SET_LOGGED_IN_TO_TRUE";
const LOG_OUT_OF_AZURE = "WTS/azure/LOG_OUT_OF_AZURE";

export { LOG_OUT_OF_AZURE, SET_LOGGED_IN_TO_TRUE, LOG_IN_TO_AZURE, IS_LOGGED_IN_TO_AZURE, GET_PAGES_OPTIONS, GET_BACKEND_FRAMEWORKS, GET_FRONTEND_FRAMEWORKS, SELECT_WEB_APP, SELECT_PAGES, SELECT_BACKEND_FRAMEWORK, SELECT_FRONTEND_FRAMEWORK, GET_BACKEND_FRAMEWORKS_SUCCESS, GET_FRONTEND_FRAMEWORKS_SUCCESS, GET_VSCODE_API, GET_WEB_APP_OPTIONS, GET_WEB_APP_OPTIONS_SUCCESS, LOAD_WIZARD_CONTENT, GET_PAGES_OPTIONS_SUCCESS };
