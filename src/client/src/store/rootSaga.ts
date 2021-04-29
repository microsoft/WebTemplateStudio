import { SagaMiddleware } from "redux-saga";
import { all } from "redux-saga/effects";

import { IVSCodeObject } from "../types/vscode";
import {
  loadLogin,
  loadProjectTypesListSagaAndOptionalFrameworkList,
  loadroutesNavItemsaSaga,
  loadTemplatesSaga,
  resetWizardSaga,
} from "./config/config/saga";
import { getFeaturesSaga } from "./userSelection/frameworks/getFeaturesSaga";
import { frameworkSaga } from "./userSelection/frameworks/saga";

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

function runSagaMiddleware(vscode: IVSCodeObject, sagaMiddleware: SagaMiddleware<any>): void {
  rootSagaVscode = vscode;
  sagaMiddleware.run(rootSaga);
}

export default runSagaMiddleware;
