import * as Actions from "../../actions/types";

const openModal = (state = null, action: any) => {
    switch(action.type) {
        case Actions.OPEN_MODAL:
            return action.payload;
        case Actions.CLOSE_MODALS:
            return null;
        default:
            return state;
    }
}

export { openModal };
