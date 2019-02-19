import * as Actions from "./types";

const getBackendFrameworksSuccess = (backendFrameworks: any) => ({
    type: Actions.GET_BACKEND_FRAMEWORKS_SUCCESS,
    payload: backendFrameworks
})

export { getBackendFrameworksSuccess };
