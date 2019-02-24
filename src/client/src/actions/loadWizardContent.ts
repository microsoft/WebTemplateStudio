import * as Actions from "./types";

import { getPagesOptionsSuccess } from "./getPagesOptions";

import getFakePagesOptions from "../mockData/pagesOptions";

/**
 * Redux-thunk action that dispatches multiple actions to load
 * the content for the wizard.
 *
 */
const loadWizardContentAction = () => {
  return async (dispatch: any) => {
    // TODO: Do fetch request here, dispatch success or failure

    const pagesOptions = await getFakePagesOptions();
    dispatch(getPagesOptionsSuccess(pagesOptions));
  };
};

export { loadWizardContentAction };
