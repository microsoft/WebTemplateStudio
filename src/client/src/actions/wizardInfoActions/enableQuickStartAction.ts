import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IEnableQuickStart {
  type: WIZARD_INFO_TYPEKEYS.ENABLE_QUICK_START;
}

export const enableQuickStartAction = (): IEnableQuickStart => {
  return {
    type: WIZARD_INFO_TYPEKEYS.ENABLE_QUICK_START
  };
};
