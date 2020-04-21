import { combineReducers } from "redux";
import detailsPage from "../navigation/routes/detailsPageReducer";
import previewStatus from "./config/previewReducer";
import validations from "./validations/setValidationsReducer";
import versions from "./versions/reducer";
import { azureProfileData } from "./azure/reducer";
import appType from "./app/reducer";

const configReducer = combineReducers({
  detailsPage,
  previewStatus,
  validations,
  versions,
  azureProfileData,
  appType
});

export default configReducer;
export type ConfigState = ReturnType<typeof configReducer>;