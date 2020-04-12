import {takeEvery, call, put} from "redux-saga/effects";
import { CONFIG_TYPEKEYS, WIZARD_INFO_TYPEKEYS } from "../../typeKeys";
import { getUserStatus, getTemplateInfo } from "../../../utils/extensionService/extensionService";
import { IVersions } from "../../../types/version";
import { WIZARD_SELECTION_TYPEKEYS } from "../../userSelection/typeKeys";

export function* loadSaga(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const eventUserStatus: any = yield call(getUserStatus, vscode);
    const messageUserStatus = eventUserStatus.data;
    if (messageUserStatus.payload !== null) {
      const payload = messageUserStatus.payload as AzureProfile;
      yield put({ type: CONFIG_TYPEKEYS.LOG_IN_TO_AZURE, payload });
    }
  
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