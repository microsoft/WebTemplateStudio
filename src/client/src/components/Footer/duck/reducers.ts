import { combineReducers } from "redux";
import * as Actions from "./types";

/* State Shape
{
    isVsCodeApiAcquired: boolean,
    vscode: any
}
*/

const mockVsCodeApi = () => {
    return {
        postMessage: ({ command, alert }: { command: string, alert: string }) => { console.log("command is " + command + ", alert is " + alert); }
    }
}

function vscodeApi(state = {
    isVsCodeApiAcquired: false,
    vscode: undefined,
}, action: any) {
    switch (action.type) {
        case Actions.GET_VSCODE_API:
            let newState: any = {...state};
            if (!newState.isVsCodeApiAcquired) {
                // @ts-ignore initialize VSCode API over here
                newState.isVsCodeApiAcquired = true;
                // @ts-ignore
                newState.vscode = process.env.NODE_ENV === "production" ? acquireVsCodeApi() : mockVsCodeApi();
                return newState;
            }
            return newState;
        default:
            return state;
    }
}

export default combineReducers({
    vscodeApi,
});
