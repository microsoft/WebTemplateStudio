import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";

const createTemplateButton = (
    state = false,
    action: any
) => {
    switch(action.type) {
        case WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_TEMPLATE_BUTTON:
            const newState = true
            return newState
        default:
            return state
    }
}

export default createTemplateButton