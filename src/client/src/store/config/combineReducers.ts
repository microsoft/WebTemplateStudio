import { combineReducers } from "redux";
import detailsPage from "./pages/detailsPageReducer";
import previewStatus from "./config/previewReducer";
import validations from "./validations/setValidationsReducer";
import isValidatingName from "./validations/validatingNameReducer";
import versions from "./versions/reducer";
import { azureProfileData } from "./azure/reducer";

const configReducer = combineReducers({
  detailsPage,
  previewStatus,
  validations,
  isValidatingName,
  versions,
  azureProfileData
});

export default configReducer;
export type TemplateType = ReturnType<typeof configReducer>;