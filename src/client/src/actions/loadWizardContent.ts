import * as Actions from "./types";

import { getBackendFrameworksSuccess } from "./getBackendFrameworks";
import { getFrontendFrameworksSuccess } from "./getFrontendFrameworks";
import { getPagesOptionsSuccess } from "./getPagesOptions";

import getFrontendFrameworks from "../mockData/frontendFrameworks";
import getFakePagesOptions from "../mockData/pagesOptions";
import getBackendFrameworks from "../mockData/backendFrameworks";

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

    const frontendOptions = await getFrontendFrameworks();
    dispatch(getFrontendFrameworksSuccess(frontendOptions));

    const backendOptions = await getBackendFrameworks();
    dispatch(getBackendFrameworksSuccess(backendOptions));
  };
};

export { loadWizardContentAction };
