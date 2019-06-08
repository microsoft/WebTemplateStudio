import { Dispatch } from "react";
import { getFrameworks } from "./getFrameworks";
import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import WizardContentActionType from "./wizardContentActionType";
import { IOption } from "../../types/option";

export interface IFrontendFrameworksActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_FRONTEND_FRAMEWORKS_SUCCESS;
  payload: IOption[];
}

export const getFrontendFrameworksSuccess = (
  frameworks: IOption[]
): IFrontendFrameworksActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_FRONTEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});

// thunk
export const getFrontendFrameworksAction = (
  projectType: string,
  isPreview: boolean,
  serverPort: number
) => {
  return async (dispatch: Dispatch<WizardContentActionType>) => {
    return dispatch(
      getFrontendFrameworksSuccess(
        await getFrameworks(projectType, "frontend", isPreview, serverPort)
      )
    );
  };
};
