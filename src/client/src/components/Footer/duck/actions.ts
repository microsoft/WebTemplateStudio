import * as Actions from "./types";

const getVSCodeApi = () => {
    return {
        type: Actions.GET_VSCODE_API,
    }
}

export {
    getVSCodeApi
};
