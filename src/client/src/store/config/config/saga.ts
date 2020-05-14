import {takeEvery, call, put, select} from "redux-saga/effects";
import { getTemplateInfo, getFrameworks, getUserStatus } from "../../../utils/extensionService/extensionService";
import { IVersions } from "../../../types/version";
import { AppState } from "../../combineReducers";
import { getFrameworksOptions } from "../../../utils/cliTemplatesParser";
import { FRAMEWORK_TYPE } from "../../../utils/constants";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { AZURE_TYPEKEYS } from "../azure/typeKeys";

export function* loadLogin(vscode: any){
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const event: any = yield call(getUserStatus, vscode);
    const message = event.data;
    if (message.payload !== null) {
      const azureProfile = message.payload as AzureProfile;
      yield put({
        type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
        payload: azureProfile
      });
    }
  }
}

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
    yield put({type: CONFIG_TYPEKEYS.GET_TEMPLATE_INFO,payload: versionData});
    yield put({
      type: CONFIG_TYPEKEYS.SET_VALIDATIONS,
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
      payload: getFrameworksOptions(
        message.payload.frameworks,
        FRAMEWORK_TYPE.FRONTEND,
        message.payload.isPreview
      )
    });

    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
      payload: getFrameworksOptions(
        message.payload.frameworks,
        FRAMEWORK_TYPE.BACKEND,
        message.payload.isPreview
      )
    });
  }
}