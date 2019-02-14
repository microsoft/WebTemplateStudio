import * as Actions from "./types";

const getWebAppOptionsSuccess = (webAppOptions: any) => ({
    type: Actions.GET_WEB_APP_OPTIONS_SUCCESS,
    payload: webAppOptions
})

export { getWebAppOptionsSuccess };