import * as Actions from "./types";

import login from "../mockData/login";

const isLoggedIntoAzureAction = () => ({
    type: Actions.IS_LOGGED_IN_TO_AZURE,
});

const logIntoAzureAction = (loginData: any) => ({
    type: Actions.LOG_IN_TO_AZURE,
    payload: loginData
});

const startLoginToAzure = () => {
    return async (dispatch: any) => {
        // Can dispatch a spinner here until login completes
        try {
            const loginData = await login();
            dispatch(logIntoAzureAction(loginData));
        } catch (err) {
            console.log(err);
        }
    }
}

export { isLoggedIntoAzureAction, logIntoAzureAction, startLoginToAzure };
