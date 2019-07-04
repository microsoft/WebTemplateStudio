import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import { IUpdateCreateTemplateButton } from '../../actions/wizardInfoActions/updateCreateTemplateButton'
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

const createTemplateButton = (
    state : boolean = false,
    action: IUpdateCreateTemplateButton | WizardInfoType
) => {
    switch(action.type) {
        case WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_TEMPLATE_BUTTON:
            return action.payload;
        case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
            const newState = false;
            return newState;
        default:
            return state;
    }
}

export default createTemplateButton;