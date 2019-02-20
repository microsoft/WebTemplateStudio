import * as Actions from "./types";

const selectFrontendFramework = (frontendFramework: string) => ({
    type: Actions.SELECT_FRONTEND_FRAMEWORK,
    payload: frontendFramework
})

export { selectFrontendFramework };
