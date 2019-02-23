import * as Actions from "../../actions/types";

/* State Shape
{
    profileData: {}
}
*/

const profileData = (state = {}, action: any) => {
    switch(action.type) {
        case Actions.LOG_OUT_OF_AZURE:
            return {};
        case Actions.LOG_IN_TO_AZURE:
            const newState = {
                ...state,
                email: action.payload,
            };
            return newState;
        default:
            return state;
    }
}

export default profileData;
