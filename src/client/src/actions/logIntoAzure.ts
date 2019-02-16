import * as Actions from "./types";

import login from "../mockData/login";

const isLoggedIntoAzureAction = () => ({
    type: Actions.IS_LOGGED_IN_TO_AZURE,
});

const setIsLoggedInToTrue = () => ({
    type: Actions.SET_LOGGED_IN_TO_TRUE,
})

const logIntoAzureAction = (loginData: any) => ({
    type: Actions.LOG_IN_TO_AZURE,
    payload: loginData,
});

const startLoginToAzure = () => {
    return async (dispatch: any) => {
        // Can dispatch a spinner here until login completes
        try {
            const loginData = await login();
            dispatch(logIntoAzureAction(loginData));
            dispatch(setIsLoggedInToTrue());
        } catch (err) {
            console.log(err);
        }
    }
}

export { isLoggedIntoAzureAction, startLoginToAzure };
