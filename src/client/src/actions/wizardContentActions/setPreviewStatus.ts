import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
export interface IPreviewStatusActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS;
  payload: boolean;
}

export const setPreviewStatusAction = (
  isPreview: boolean
): IPreviewStatusActionType => ({
  payload: isPreview,
  type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS
});
