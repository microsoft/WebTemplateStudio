import * as Actions from "./types";

const selectPagesAction = (pages: string[]) => ({
    type: Actions.SELECT_PAGES,
    payload: pages
})

export { selectPagesAction };
