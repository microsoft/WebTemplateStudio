import { combineReducers } from "redux";
import * as Actions from "../actions/types";

/* State Shape
{
    isVsCodeApiAcquired: boolean,
    vscode: any
}
*/

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 */
const mockVsCodeApi = () => {
  return {
    postMessage: ({ command, alert }: { command: string; alert: string }) => {
      console.log(`Command is ${command}, alert is ${alert}`);
    }
  };
};

function vscodeApi(
  state = {
    isVsCodeApiAcquired: false,
    vscodeObject: undefined
  },
  action: any
) {
  switch (action.type) {
    case Actions.GET_VSCODE_API:
      if (!state.isVsCodeApiAcquired) {
        const newState = { ...state };
        newState.isVsCodeApiAcquired = true;
        newState.vscodeObject =
          process.env.NODE_ENV === "production"
            ? 
            // @ts-ignore
            acquireVsCodeApi()
            : mockVsCodeApi();
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export default vscodeApi;
