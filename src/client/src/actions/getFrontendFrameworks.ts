import * as Actions from "./types";

const getFrontendFrameworksSuccess = (frontendFrameworks: any) => ({
    type: Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS,
    payload: frontendFrameworks
})

export { getFrontendFrameworksSuccess };
