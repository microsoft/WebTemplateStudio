import * as Actions from "./types";

export const getPathAvailability = (pathAvailability: any) => ({
    type: Actions.GET_PATH_AVAILABILITY,
    payload: pathAvailability
});
