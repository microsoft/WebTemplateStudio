import {takeEvery, call, put, select} from "redux-saga/effects";
import { getTemplateInfo, getFrameworks, getUserStatus, getProjectTypes, getPages } from "../../../utils/extensionService/extensionService";
import { IVersions } from "../../../types/version";
import { AppState } from "../../combineReducers";
import { getFrameworksOptions, getPagesOptions } from "../../../utils/cliTemplatesParser";
import { FRAMEWORK_TYPE } from "../../../utils/constants/constants";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { AZURE_TYPEKEYS } from "../azure/typeKeys";
import { USERSELECTION_TYPEKEYS } from "../../userSelection/typeKeys";
import { getNavItems } from "../../../utils/routes/routes";
import { IRoutesNavItems } from "../../../types/route";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants/internalNames";
import { ISelected } from "../../../types/selected";

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

export function* loadProjectTypesListSagaAndOptionalFrameworkList(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const event: any = yield call(getProjectTypes, vscode);
    const projectTypes = event.data.payload.projectTypes.map((projectType: any) => projectType.name);
    const projectType = projectTypes[0];
    const isPreview = yield select((state: AppState) => state.config.previewStatus);
    
    yield put ({
      type: TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES,
      payload: projectTypes
    });

    yield put ({
      type: USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE,
      payload: projectType
    });

    if (projectType === WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP){
      const event: any = yield call(getFrameworks, vscode, isPreview, projectType);
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
    }else{
      const event: any = yield call(getPages, vscode, projectType, "", "");
      const pageOptions = getPagesOptions(event.data.payload.pages);
      const selectedPages: ISelected[] = [];
      yield put({ type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS, payload: pageOptions });

      const blankPage = pageOptions[0];
      const blankSelect: ISelected = {
        author: blankPage.author,
        defaultName: blankPage.defaultName,
        internalName: blankPage.internalName,
        isValidTitle: blankPage.isValidTitle,
        licenses: blankPage.licenses,
        title: blankPage.defaultName ? blankPage.defaultName : "",
        id:Math.random().toString()
      };
      selectedPages.push(blankSelect);
      yield put({ type: USERSELECTION_TYPEKEYS.SELECT_PAGES, payload: selectedPages });
    }
  }
}

export function* loadroutesNavItemsaSaga(){
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    const platform = yield select((state: AppState) => state.config.platform);
    const routes: IRoutesNavItems[] = getNavItems(platform);
    yield put({
      payload: routes,
      type: TEMPLATES_TYPEKEYS.SET_ROUTES
    });
  }
}
