import {all} from "redux-saga/effects";
import {frameworkSaga} from "./userSelection/frameworks/saga";
let rootSagaVscode: any;
function* rootSaga(){
    yield all([frameworkSaga(rootSagaVscode)])
}

function runSagaMiddleware(vscode: any, sagaMiddleware: any){
    rootSagaVscode = vscode;
    sagaMiddleware.run(rootSaga);
}

export default runSagaMiddleware;