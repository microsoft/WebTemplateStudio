import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IUpdateCreateProjectButton {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_PROJECT_BUTTON;
  payload: boolean;
}

export const updateCreateProjectButtonAction = (
  payload: boolean
): IUpdateCreateProjectButton => {
  return {
    type: WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_PROJECT_BUTTON,
    payload
  };
};
