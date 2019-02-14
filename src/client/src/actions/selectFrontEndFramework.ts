import * as Actions from "./types";

const selectFrontendFramework = (frontendFrameworks: any) => ({
    type: Actions.SELECT_FRONTEND_FRAMEWORK,
    payload: frontendFrameworks
})

export { selectFrontendFramework };
