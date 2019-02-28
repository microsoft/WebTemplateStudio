import { getFrameworks } from "./getFrameworks";
import * as Actions from "./types";

export const getFrontendFrameworksSuccess = (frameworks: any) => ({
  type: Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});

// thunk
export const getFrontendFrameworksAction = (projectType: string) => {
  return async (dispatch: any) => {
    return dispatch(
      getFrontendFrameworksSuccess(await getFrameworks(projectType, "frontend"))
    );
  };
};
