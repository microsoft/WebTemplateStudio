import { combineReducers } from "redux";

import { azureProfileData } from "./azure/reducer";
import previewStatus from "./config/previewReducer";
import detailsPage from "./detailsPage/detailsPageReducer";
import platform from "./platform/reducer";
import validations from "./validations/setValidationsReducer";
import versions from "./versions/reducer";

const configReducer = combineReducers({
  detailsPage,
  previewStatus,
  validations,
  versions,
  azureProfileData,
  platform,
});

export default configReducer;
export type ConfigState = ReturnType<typeof configReducer>;
