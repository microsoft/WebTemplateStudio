import * as Actions from "./types";

import login from "../mockData/login";

const isLoggedIntoAzureAction = () => ({
    type: Actions.IS_LOGGED_IN_TO_AZURE,
});

const logIntoAzureAction = (loginData: any) => ({
    type: Actions.IS_LOGGED_IN_TO_AZURE,
    payload: loginData,
});

const startLoginToAzure = () => {
    return async (dispatch: any) => {
        // Can dispatch a spinner here until login completes
        const loginData = await login();
        dispatch(logIntoAzureAction(loginData));
    }
}

export { isLoggedIntoAzureAction, startLoginToAzure };
