import { combineReducers } from "redux";
import detailsPage from "./pages/detailsPageReducer";
import previewStatus from "./config/previewReducer";

const configReducer = combineReducers({
  detailsPage,
  previewStatus
});

export default configReducer;
export type TemplateType = ReturnType<typeof configReducer>;