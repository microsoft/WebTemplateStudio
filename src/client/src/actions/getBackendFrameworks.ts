import { getFrameworks } from "./getFrameworks";
import * as Actions from "./types";

const getBackendFrameworksSuccess = (frameworks: any) => ({
  type: Actions.GET_BACKEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});

// thunk
export const getBackendFrameworksAction = (projectType: string) => {
  return async (dispatch: any) => {
    return dispatch(
      dispatch(
        getBackendFrameworksSuccess(await getFrameworks(projectType, "backend"))
      )
    );
  };
};
