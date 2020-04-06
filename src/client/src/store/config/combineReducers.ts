import { combineReducers } from "redux";
import detailsPage from "./pages/detailsPageReducer";
import previewStatus from "./wizardContent/previewReducer";

const wizardContentReducer = combineReducers({
  detailsPage,
  previewStatus
});

export default wizardContentReducer;
export type TemplateType = ReturnType<typeof wizardContentReducer>;