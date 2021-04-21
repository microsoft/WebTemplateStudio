import { call, put, takeEvery } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { IOption } from "../../../types/option";
import { ISelected } from "../../../types/selected";
import { IVSCodeObject } from "../../../types/vscode";
import { getPagesOptions } from "../../../utils/cliTemplatesParser";
import { getPages } from "../../../utils/extensionService/extensionService";
import { AppState } from "../../combineReducers";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";

export function* frameworkSaga(vscode: IVSCodeObject): any {
  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK, callBack);

  yield takeEvery(USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK, callBack);

  function* callBack() {
    const selectedPagesSelector = (state: AppState) => state.userSelection.pages;
    const selectedFrontendSelector = (state: AppState) => state.userSelection.frontendFramework;
    const selectedBackendSelector = (state: AppState) => state.userSelection.backendFramework;
    const selectedProjectTypeSelector = (state: AppState) => state.userSelection.projectType;

    const selectedPages: ISelected[] = yield select(selectedPagesSelector);
    const selectedFrontend: ISelected = yield select(selectedFrontendSelector);
    const selectedBackend: ISelected = yield select(selectedBackendSelector);
    const selectedProjectType: ISelected = yield select(selectedProjectTypeSelector);

    if (selectedFrontend.internalName !== "" || selectedBackend.internalName !== "") {
      const event: any = yield call(
        getPages,
        vscode,
        selectedProjectType.internalName,
        selectedFrontend.internalName,
        selectedBackend.internalName
      );
      const pageOptions = getPagesOptions(event.data.payload.pages);
      yield put({ type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS, payload: pageOptions });

      let newSelectedPages: ISelected[] = [];
      if (selectedPages.length === 0) {
        const blankPage = pageOptions[0];
        const blankSelect = mapIOptionToISelected(blankPage);
        newSelectedPages.push(blankSelect);
      } else {
        newSelectedPages = selectedPages.reduce((result, page) => {
          const option = pageOptions.find((p) => p.defaultName === page.defaultName);
          if (option) {
            const iselected = mapIOptionToISelected(option, page.title);
            result.push(iselected);
          }
          return result;
        }, [] as ISelected[]);
      }
      yield put({ type: USERSELECTION_TYPEKEYS.SELECT_PAGES, payload: newSelectedPages });
    }
  }

  const mapIOptionToISelected = (option: IOption, title: string = option.defaultName ?? ""): ISelected => {
    return {
      author: option.author,
      defaultName: option.defaultName,
      internalName: option.internalName,
      isValidTitle: option.isValidTitle,
      icon: option.icon,
      licenses: option.licenses,
      title: title,
      id: Math.random().toString(),
      editable: option.editable,
    };
  };
}
