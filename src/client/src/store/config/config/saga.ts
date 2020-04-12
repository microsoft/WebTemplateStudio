import {takeEvery, call, put} from "redux-saga/effects";
import { CONFIG_TYPEKEYS } from "../../typeKeys";
import { getUserStatus } from "../../../utils/extensionService/extensionService";

export function* loadSaga(vscode: any) {
  yield takeEvery(
    CONFIG_TYPEKEYS.LOAD,
    callBack
  );

  function* callBack (){
    debugger;
    const event: any = yield call(getUserStatus, vscode);
    const message = event.data;
    const ee = document.getElementById("root");
    debugger;
    if (ee){
      debugger;
      ee.innerHTML=JSON.stringify(message);
    } 
    
    if (message.payload !== null) {
      const payload = message.payload as AzureProfile;
      yield put({ type: CONFIG_TYPEKEYS.LOG_IN_TO_AZURE, payload });
    }
  }
}

