import { takeEvery, call, put } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { AppState } from "../../combineReducers";
import { getFeatures } from "../../../utils/extensionService/extensionService";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { getOptionalFromApiTemplateInfo, getApiTemplateInfoFromJson } from "../../templates/pages/action";
import { setFeaturesAction } from "../../templates/features/actions";
//import { ServiceState } from "../services/combineReducers";

export function* getFeaturesSaga(vscode: any) {
  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK, callBack);
  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK, callBack);

  function* callBack() {
    //const selectedServicesSelector = (state: AppState) => state.userSelection.services;
    const selectedFrontendSelector = (state: AppState) => state.userSelection.frontendFramework;
    const selectedBackendSelector = (state: AppState) => state.userSelection.backendFramework;

    //const selectedServices: ServiceState = yield select(selectedServicesSelector);
    const selectedFrontend = yield select(selectedFrontendSelector);
    const selectedBackend = yield select(selectedBackendSelector);

    if (selectedFrontend.internalName !== "" && selectedBackend.internalName !== "") {
      const event: any = yield call(getFeatures, vscode, selectedFrontend.internalName, selectedBackend.internalName);
      const features = getOptionalFromApiTemplateInfo(getApiTemplateInfoFromJson(event.data.payload.features));
      yield put(setFeaturesAction(features));

      //todo: remove services if not exist
    }
  }
}
