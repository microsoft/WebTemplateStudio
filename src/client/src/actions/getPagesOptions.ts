import * as Actions from "./types";

const getPagesOptionsSuccess = (pagesOptions: any) => ({
    type: Actions.GET_PAGES_OPTIONS_SUCCESS,
    payload: pagesOptions
})

export { getPagesOptionsSuccess };
