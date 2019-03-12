import * as Actions from "../../actions/types";

/* State Shape
{
    pathAvailability: {
        isAvailable: boolean,
        error: string
    }
}
*/

const pathAvailability = (state = {}, action: any) => {
    switch (action.type) {
        case Actions.GET_PATH_AVAILABILITY:
            return action.payload;
        default:
            return state;
    }
};

export default pathAvailability;