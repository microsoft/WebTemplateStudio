import * as Actions from "./types";

const selectWebAppAction = (webAppOption: string) => ({
    type: Actions.SELECT_WEB_APP,
    payload: webAppOption
})

export { selectWebAppAction };
