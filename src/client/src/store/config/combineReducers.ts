import { combineReducers } from "redux";
import detailsPage from "./detailsPage/detailsPageReducer";
import previewStatus from "./config/previewReducer";
import validations from "./validations/setValidationsReducer";
import versions from "./versions/reducer";
import { azureProfileData } from "./azure/reducer";
import platform from "./platform/reducer";

const configReducer = combineReducers({
  detailsPage,
  previewStatus,
  validations,
  versions,
  azureProfileData,
  platform
});

export default configReducer;
export type ConfigState = ReturnType<typeof configReducer>;