import { getFrameworks } from "./getFrameworks";
import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";
import WizardContentActionType from "./wizardContentActionType";
import { Dispatch } from "react";

export interface IBackendFrameworksSuccessActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_BACKEND_FRAMEWORKS_SUCCESS;
  payload: IOption[];
}

export const getBackendFrameworksSuccess = (
  frameworks: IOption[]
): IBackendFrameworksSuccessActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_BACKEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});

// thunk
export const getBackendFrameworksAction = (
  projectType: string,
  isPreview: boolean,
  serverPort: number
) => {
  return async (dispatch: Dispatch<WizardContentActionType>) => {
    return dispatch(
      getBackendFrameworksSuccess(
        await getFrameworks(projectType, "backend", isPreview, serverPort)
      )
    );
  };
};
