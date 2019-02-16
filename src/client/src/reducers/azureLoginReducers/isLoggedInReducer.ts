import * as Actions from "../../actions/types";

/* State Shape
{
    isLoggedIn: boolean
}
*/

const profileData = (state = false, action: any) => {
    switch(action.type) {
        case Actions.IS_LOGGED_IN_TO_AZURE:
        default:
            return state;
    }
}

export default profileData;
