import {takeEvery, call, put, select} from "redux-saga/effects";
import { CONFIG_TYPEKEYS, WIZARD_INFO_TYPEKEYS, TEMPLATES_TYPEKEYS } from "../../typeKeys";
import { getTemplateInfo, getFrameworks } from "../../../utils/extensionService/extensionService";
import { IVersions } from "../../../types/version";
import { WIZARD_SELECTION_TYPEKEYS } from "../../userSelection/typeKeys";
import { AppState } from "../../combineReducers";
import { parseFrameworksPayload } from "../../../utils/parseFrameworksPayload";
import { FRAMEWORK_TYPE } from "../../../utils/constants";

export function* loadTemplatesSaga(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const eventTemplateInfo: any = yield call(getTemplateInfo, vscode);
    const messageTemplateInfo = eventTemplateInfo.data;
    const versionData: IVersions = {
      templatesVersion:messageTemplateInfo.payload.templatesVersion,
      wizardVersion: messageTemplateInfo.payload.wizardVersion
    };
    yield put({type: WIZARD_INFO_TYPEKEYS.GET_TEMPLATE_INFO,payload: versionData});
    yield put({
      type: WIZARD_SELECTION_TYPEKEYS.SET_VALIDATIONS,
      payload: {
        itemNameValidationConfig:messageTemplateInfo.payload.itemNameValidationConfig,
        projectNameValidationConfig:messageTemplateInfo.payload.projectNameValidationConfig
      }
    });
    yield put({
      payload: messageTemplateInfo.payload.preview,
      type: CONFIG_TYPEKEYS.SET_PREVIEW_STATUS
    });
  }
}

export function* loadFrameworksListSaga(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const isPreviewSelector = (state: AppState) => state.config.previewStatus;
    const isPreview = yield select(isPreviewSelector);

    const event: any = yield call(getFrameworks, vscode, isPreview);
    const message = event.data;
    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_FRONTEND_FRAMEWORKS,
      payload: parseFrameworksPayload(
        message.payload.frameworks,
        FRAMEWORK_TYPE.FRONTEND,
        message.payload.isPreview
      )
    });

    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
      payload: parseFrameworksPayload(
        message.payload.frameworks,
        FRAMEWORK_TYPE.BACKEND,
        message.payload.isPreview
      )
    });
  }
}