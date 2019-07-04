import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";

const createTemplateButton = (
    state = false,
    action: any
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