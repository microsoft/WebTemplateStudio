import * as Actions from "./types";

const selectBackendFrameworkAction = (frontendFramework: string) => ({
    type: Actions.SELECT_BACKEND_FRAMEWORK,
    payload: frontendFramework
})

export { selectBackendFrameworkAction };
