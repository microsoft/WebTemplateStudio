import * as Actions from "./types";

const getBackendFrameworks = () => ({
    type: Actions.GET_BACKEND_FRAMEWORKS,
})


const getBackendFrameworksSuccess = (backendFrameworks: any) => ({
    type: Actions.GET_BACKEND_FRAMEWORKS_SUCCESS,
    payload: backendFrameworks
})

export { getBackendFrameworks, getBackendFrameworksSuccess };
