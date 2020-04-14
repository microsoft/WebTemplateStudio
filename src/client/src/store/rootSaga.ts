import {all} from "redux-saga/effects";
import {frameworkSaga} from "./userSelection/frameworks/saga";
import { loadTemplatesSaga, loadFrameworksListSaga, loadLogin } from "./config/config/saga";

let rootSagaVscode: any;
function* rootSaga(){
    yield all([frameworkSaga(rootSagaVscode),
        loadTemplatesSaga(rootSagaVscode),
        loadFrameworksListSaga(rootSagaVscode),
        loadLogin(rootSagaVscode)])
}

function runSagaMiddleware(vscode: any, sagaMiddleware: any){
    rootSagaVscode = vscode;
    sagaMiddleware.run(rootSaga);
}

export default runSagaMiddleware;