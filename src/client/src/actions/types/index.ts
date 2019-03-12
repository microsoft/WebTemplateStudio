const GET_VSCODE_API = "WTS/vscode/GET_VSCODE_API";

// Obtaining wizard data from engine
const GET_PAGES_OPTIONS = "WTS/wizardContent/GET_PAGES_OPTIONS";
const GET_PAGES_OPTIONS_SUCCESS = "WTS/wizardContent/GET_PAGES_OPTIONS_SUCCESS";
const GET_PROJECT_TYPES = "WTS/wizardContent/GET_PROJECT_TYPES";
const GET_PROJECT_TYPES_SUCCESS = "WTS/wizardContent/GET_PROJECT_TYPES_SUCCESS";
const GET_WEB_APP_OPTIONS = "WTS/wizardContent/GET_WEB_APP_OPTIONS";
const GET_WEB_APP_OPTIONS_SUCCESS =
  "WTS/wizardContent/GET_WEB_APP_OPTIONS_SUCCESS";
const GET_FRONTEND_FRAMEWORKS = "WTS/wizardContent/GET_FRONTEND_FRAMEWORKS";
const GET_FRONTEND_FRAMEWORKS_SUCCESS =
  "WTS/wizardContent/GET_FRONTEND_FRAMEWORKS_SUCCESS";
const GET_BACKEND_FRAMEWORKS = "WTS/wizardContent/GET_BACKEND_FRAMEWORKS";
const GET_BACKEND_FRAMEWORKS_SUCCESS =
  "WTS/wizardContent/GET_BACKEND_FRAMEWORKS_SUCCESS";
const LOAD_WIZARD_CONTENT = "WTS/wizardContent/LOAD_WIZARD_CONTENT";

// Wizard selection actions
const SELECT_FRONTEND_FRAMEWORK =
  "WTS/wizardSelections/SELECT_FRONTEND_FRAMEWORK";
const SELECT_BACKEND_FRAMEWORK =
  "WTS/wizardSelections/SELECT_BACKEND_FRAMEWORK";
const SELECT_PAGES = "WTS/wizardSelections/SELECT_PAGES";
const SELECT_WEB_APP = "WTS/wizardSelections/SELECT_WEB_APP";
const UPDATE_PROJECT_NAME = "WTS/wizardSelections/UPDATE_PROJECT_NAME";
const UPDATE_OUTPUT_PATH = "WTS/wizardSelections/UPDATE_PROJECT_PATH";
const GET_PATH_AVAILABILITY = "WTS/wizardSelections/GET_PATH_AVAILABILITY";

// Azure actions
const IS_LOGGED_IN_TO_AZURE = "WTS/azure/IS_LOGGED_IN_TO_AZURE";
const LOG_IN_TO_AZURE = "WTS/azure/LOG_IN_TO_AZURE";
const LOG_OUT_OF_AZURE = "WTS/azure/LOG_OUT_OF_AZURE";
const SAVE_COSMOS_DB_RESOURCE_SETTINGS =
  "WTS/azure/SAVE_COSMOS_DB_RESOURCE_SETTINGS";
const SAVE_AZURE_FUNCTIONS_SETTINGS = "WTS/azure/SAVE_AZURE_FUNCTIONS_SETTINGS";
const GET_SUBSCRIPTION_DATA = "WTS/azure/GET_SUBSCRIPTION_DATA";
const SET_ACCOUNT_AVAILABILITY = "WTS/cosmosDb/SET_ACCOUNT_AVAILABILITY";
const SET_APP_NAME_AVAILABILITY = "WTS/azureFunctions/SET_APP_NAME_AVAILABILITY";
const UPDATE_AZURE_FUNCTION_NAMES = "WTS/azureFunctions/UPDATE_AZURE_FUNCTIONS";

// Modal actions
const OPEN_MODAL = "WTS/modals/OPEN_MODAL";
const CLOSE_MODALS = "WTS/modals/CLOSE_MODALS";

/**
 * Modal Types
 * Must add a modal type here when creating a new modal
 * Modal type registered in Redux store as notification a modal is open
 */
const COSMOS_DB_MODAL = "COSMOS_DB_MODAL";
const AZURE_FUNCTIONS_MODAL = "AZURE_FUNCTIONS_MODAL";
export type ModalType = "COSMOS_DB_MODAL" | "AZURE_FUNCTIONS_MODAL";

export {
  AZURE_FUNCTIONS_MODAL,
  SET_ACCOUNT_AVAILABILITY,
  SET_APP_NAME_AVAILABILITY,
  UPDATE_PROJECT_NAME,
  UPDATE_OUTPUT_PATH,
  GET_PROJECT_TYPES,
  GET_PROJECT_TYPES_SUCCESS,
  SAVE_AZURE_FUNCTIONS_SETTINGS,
  SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  OPEN_MODAL,
  CLOSE_MODALS,
  COSMOS_DB_MODAL,
  LOG_OUT_OF_AZURE,
  LOG_IN_TO_AZURE,
  IS_LOGGED_IN_TO_AZURE,
  GET_PAGES_OPTIONS,
  GET_FRONTEND_FRAMEWORKS_SUCCESS,
  GET_BACKEND_FRAMEWORKS_SUCCESS,
  GET_BACKEND_FRAMEWORKS,
  GET_FRONTEND_FRAMEWORKS,
  SELECT_WEB_APP,
  SELECT_PAGES,
  SELECT_BACKEND_FRAMEWORK,
  SELECT_FRONTEND_FRAMEWORK,
  GET_VSCODE_API,
  GET_WEB_APP_OPTIONS,
  GET_WEB_APP_OPTIONS_SUCCESS,
  LOAD_WIZARD_CONTENT,
  GET_PAGES_OPTIONS_SUCCESS,
  GET_SUBSCRIPTION_DATA,
  UPDATE_AZURE_FUNCTION_NAMES
  GET_PATH_AVAILABILITY
};
