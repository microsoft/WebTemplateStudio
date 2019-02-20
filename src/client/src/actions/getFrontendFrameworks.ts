import * as Actions from "./types";

const getFrontendFrameworksAction = () => ({
    type: Actions.GET_FRONTEND_FRAMEWORKS,
});

const getFrontendFrameworksSuccess = (frontendFrameworks: any) => ({
    type: Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS,
    payload: frontendFrameworks
})

export { getFrontendFrameworksAction, getFrontendFrameworksSuccess };
