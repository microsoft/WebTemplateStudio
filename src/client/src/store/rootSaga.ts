import {all} from "redux-saga/effects";
import {frameworkSaga} from "./userSelection/frameworks/saga";
import {getFeaturesSaga} from "./userSelection/frameworks/getFeaturesSaga";
import { loadTemplatesSaga, loadLogin, loadProjectTypesListSagaAndOptionalFrameworkList, loadroutesNavItemsaSaga } from "./config/config/saga";

let rootSagaVscode: any;
function* rootSaga(){
    yield all([frameworkSaga(rootSagaVscode),
        getFeaturesSaga(rootSagaVscode),
        loadTemplatesSaga(rootSagaVscode),
        loadProjectTypesListSagaAndOptionalFrameworkList(rootSagaVscode),
        loadLogin(rootSagaVscode),
        loadroutesNavItemsaSaga()])
}

function runSagaMiddleware(vscode: any, sagaMiddleware: any){
    rootSagaVscode = vscode;
    sagaMiddleware.run(rootSaga);
}

export default runSagaMiddleware;