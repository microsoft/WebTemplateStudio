import * as Actions from "./types";

const selectFrontendFramework = (backendFrameworks: string) => ({
    type: Actions.SELECT_FRONTEND_FRAMEWORK,
    payload: backendFrameworks
})

export { selectFrontendFramework };
