import * as Actions from "./types";

const getPagesOptionsAction = () => ({
    type: Actions.GET_PAGES_OPTIONS,
})

const getPagesOptionsSuccess = (pagesOptions: any) => ({
    type: Actions.GET_PAGES_OPTIONS_SUCCESS,
    payload: pagesOptions
})

export { getPagesOptionsAction, getPagesOptionsSuccess };
