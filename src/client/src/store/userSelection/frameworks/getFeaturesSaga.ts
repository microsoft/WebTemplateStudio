import { takeEvery, call, put } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { AppState } from "../../combineReducers";
import { getFeatures } from "../../../utils/extensionService/extensionService";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { getFeaturesOptions } from "../../../utils/cliTemplatesParser";
import { setFeaturesAction } from "../../templates/features/actions";

export function* getFeaturesSaga(vscode: any) {
  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK, callBack);
  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK, callBack);

  function* callBack() {
    const selectedFrontendSelector = (state: AppState) => state.userSelection.frontendFramework;
    const selectedBackendSelector = (state: AppState) => state.userSelection.backendFramework;

    const selectedFrontend = yield select(selectedFrontendSelector);
    const selectedBackend = yield select(selectedBackendSelector);

    if (selectedFrontend.internalName !== "" || selectedBackend.internalName !== "") {
      const event: any = yield call(getFeatures, vscode, selectedFrontend.internalName, selectedBackend.internalName);
      const features = getFeaturesOptions(event.data.payload.features);
      yield put(setFeaturesAction(features));
    }
  }
}
