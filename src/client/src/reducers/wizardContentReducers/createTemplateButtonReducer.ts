import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";

const createTemplateButton = (
    state = false,
    action: any
) => {
    switch(action.type) {
        case WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_TEMPLATE_BUTTON:
            const newState1 = true;
            return newState1;
        case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
            const newState2 = false;
            return newState2;
        default:
            return state
    }
}

export default createTemplateButton