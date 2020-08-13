import { takeEvery, call, put } from "redux-saga/effects";
import { select} from 'redux-saga/effects';
import { AppState } from "../../combineReducers";
import { getPages } from "../../../utils/extensionService/extensionService";
import { ISelected } from "../../../types/selected";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { getPagesOptions } from "../../../utils/cliTemplatesParser";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";


export function* frameworkSaga(vscode: any) {
    yield takeEvery(
      USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
      callBack
    );

    yield takeEvery(
      USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
      callBack
    );

    function* callBack (){

      const selectedPagesSelector = (state: AppState) => state.userSelection.pages;
      const selectedFrontendSelector = (state: AppState) => state.userSelection.frontendFramework;
      const selectedBackendSelector = (state: AppState) => state.userSelection.backendFramework;

      const selectedPages = yield select(selectedPagesSelector);
      const selectedFrontend = yield select(selectedFrontendSelector);
      const selectedBackend = yield select(selectedBackendSelector);
      const projectTypes = yield select ((state: AppState) => state.templates.projectTypesOptions);
      const projectType = projectTypes[0];
      if (selectedFrontend.internalName !== "" && selectedBackend.internalName !== ""){
        const event: any = yield call(getPages, vscode, projectType, selectedFrontend.internalName, selectedBackend.internalName);
        const pageOptions = getPagesOptions(event.data.payload.pages);
        yield put({ type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS, payload: pageOptions });

        if (selectedPages.length === 0){
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
          selectedPages.push(blankSelect)
        }else{
          selectedPages.map((selectedPage: ISelected)=>{
            selectedPage.internalName = `wts.Page.${selectedFrontend.internalName}.${selectedPage.defaultName ? selectedPage.defaultName.replace(" ",""):""}`;
          });
        }
        yield put({ type: USERSELECTION_TYPEKEYS.SELECT_PAGES, payload: selectedPages });
      }
    }
  }

