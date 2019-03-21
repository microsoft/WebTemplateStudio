import * as Actions from "../../actions/types";

/* State Shape
{
    validation: {
        isValidProjectPath: boolean,
        projectPathError: string,
        isValidProjectName: boolean,
        projectNameError: string
    }
}
*/

const validation = (state = {}, action: any) => {
    switch (action.type) {
        case Actions.SET_PATH_AND_NAME_VALIDATION:
            return action.payload;
        default:
            return state;
    }
};

export default validation;