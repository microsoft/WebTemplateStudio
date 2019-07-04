import {WIZARD_INFO_TYPEKEYS} from './typeKeys'

export interface IUpdateCreateTemplateButton {
    type: WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_TEMPLATE_BUTTON;
    payload: boolean;
  }

export const updateCreateTemplateButtonAction = (payload : boolean) : IUpdateCreateTemplateButton => {
    return {
        type: WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_TEMPLATE_BUTTON,
        payload
    }
}