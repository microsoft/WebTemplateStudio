import {takeEvery, call, put, select} from "redux-saga/effects";
import { getTemplateInfo, getFrameworks, getUserStatus, getProjectTypes } from "../../../utils/extensionService/extensionService";
import { IVersions } from "../../../types/version";
import { AppState } from "../../combineReducers";
import { getFrameworksOptions } from "../../../utils/cliTemplatesParser";
import { FRAMEWORK_TYPE } from "../../../utils/constants/constants";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { AZURE_TYPEKEYS } from "../azure/typeKeys";
import { USERSELECTION_TYPEKEYS } from "../../userSelection/typeKeys";
import { getRoutes } from "../../../utils/routes/routes";

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
    const isPreview = yield select((state: AppState) => state.config.previewStatus);
    //Todo refactor, project type should be on store
    const typeProject = "FullStackWebApp";
    const event: any = yield call(getFrameworks, vscode, isPreview, typeProject);
    const message = event.data;
    const optionFrontEndFrameworks = getFrameworksOptions(
      message.payload.frameworks,
      FRAMEWORK_TYPE.FRONTEND
    );

    const defaultOptionFront = optionFrontEndFrameworks[0];
    const defaultSelectedFrontEndFramework = {
      internalName: defaultOptionFront.internalName,
      title: defaultOptionFront.title as string,
      version: `v${defaultOptionFront.version || "1.0"}`,
      licenses: defaultOptionFront.licenses,
      author: defaultOptionFront.author,
    };

    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_FRONTEND_FRAMEWORKS,
      payload: optionFrontEndFrameworks
    });

    yield put ({
      type: USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
      payload: defaultSelectedFrontEndFramework
    });
    const optionBackEndFrameworks = getFrameworksOptions(
      message.payload.frameworks,
      FRAMEWORK_TYPE.BACKEND
    );

    const defaultOptionBack = optionBackEndFrameworks[0];
    const defaultSelectedBackEndFramework = {
      title: defaultOptionBack.title as string,
      internalName: defaultOptionBack.internalName,
      version: `v${defaultOptionBack.version || "1.0"}`,
      author: defaultOptionBack.author,
      licenses: defaultOptionBack.licenses
    };

    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
      payload: optionBackEndFrameworks
    });

    yield put ({
      type: USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
      payload: defaultSelectedBackEndFramework
    });
  }
}

export function* loadProjectTypesListSaga(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const event: any = yield call(getProjectTypes, vscode);
    const projectTypes = event.data.payload.projectTypes.map((projectType: any) => projectType.name);

    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES,
      payload: projectTypes
    });

    yield put ({
      type: USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE,
      payload: projectTypes[0]
    });
  }
}

export function* loadRoutesListaSaga(){
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const platform = yield select((state: AppState) => state.config.platform);
    const routes: string[] = getRoutes(platform);
    yield put({
      payload: routes,
      type: TEMPLATES_TYPEKEYS.SET_ROUTES
    });
  }
}