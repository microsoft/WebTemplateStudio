import {takeEvery, call, put} from "redux-saga/effects";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import {select} from 'redux-saga/effects';
import { AppState } from "../../combineReducers";
import { getPages } from "../../../utils/extensionService/extensionService";
import { ISelected } from "../../../types/selected";
import { getOptionalFromApiTemplateInfo, getApiTemplateInfoFromJson } from "../../templates/pages/action";
import { TEMPLATES_TYPEKEYS } from "../../typeKeys";

export function* frameworkSaga(vscode: any) {
    yield takeEvery(
      WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
      callBack
    );

    yield takeEvery(
      WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
      callBack
    );

    function* callBack (){

      const selectedPagesSelector = (state: AppState) => state.userSelection.pages;
      const selectedFrontendSelector = (state: AppState) => state.userSelection.frontendFramework;
      const selectedBackendSelector = (state: AppState) => state.userSelection.backendFramework;
      
      const selectedPages = yield select(selectedPagesSelector);
      const selectedFrontend = yield select(selectedFrontendSelector);
      const selectedBackend = yield select(selectedBackendSelector);
      if (selectedFrontend.internalName !== "" && selectedBackend.internalName !== ""){
        const event: any = yield call(getPages, vscode, selectedFrontend.internalName, selectedBackend.internalName);
        const pageOptions = getOptionalFromApiTemplateInfo(getApiTemplateInfoFromJson(event.data.payload.pages));
        yield put({ type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS, payload: pageOptions });

        if (selectedPages.length === 0){
          const blankPage = pageOptions.filter(page => page.title === "Blank")[0];
          selectedPages.push(blankPage)
        }else{
          selectedPages.map((selectedPage: ISelected)=>{
            selectedPage.internalName = `wts.Page.${selectedFrontend.internalName}.${selectedPage.defaultName ? selectedPage.defaultName.replace(" ",""):""}`;
          });
        }
        yield put({ type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES, payload: selectedPages });
      }
    }
  }

