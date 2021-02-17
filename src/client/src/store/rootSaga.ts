import { all } from "redux-saga/effects";
import { frameworkSaga } from "./userSelection/frameworks/saga";
import { getFeaturesSaga } from "./userSelection/frameworks/getFeaturesSaga";
import {
  loadTemplatesSaga,
  loadLogin,
  loadProjectTypesListSagaAndOptionalFrameworkList,
  loadroutesNavItemsaSaga,
  resetWizardSaga,
} from "./config/config/saga";
import { IVSCodeObject } from "../types/vscode";

let rootSagaVscode: any;
function* rootSaga() {
  yield all([
    frameworkSaga(rootSagaVscode),
    getFeaturesSaga(rootSagaVscode),
    loadTemplatesSaga(rootSagaVscode),
    loadProjectTypesListSagaAndOptionalFrameworkList(rootSagaVscode),
    loadLogin(rootSagaVscode),
    loadroutesNavItemsaSaga(),
    resetWizardSaga(),
  ]);
}

function runSagaMiddleware(vscode: IVSCodeObject, sagaMiddleware: any) : void {
  rootSagaVscode = vscode;
  sagaMiddleware.run(rootSaga);
}

export default runSagaMiddleware;
