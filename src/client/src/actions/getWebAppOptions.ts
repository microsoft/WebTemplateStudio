import * as Actions from "./types";

const getWebAppOptions = () => ({
    type: Actions.GET_WEB_APP_OPTIONS,
});

const getWebAppOptionsSuccess = (webAppOptions: any) => ({
    type: Actions.GET_WEB_APP_OPTIONS_SUCCESS,
    payload: webAppOptions
})

export { getWebAppOptions, getWebAppOptionsSuccess };
