import * as Actions from "./types";

import { getBackendFrameworksSuccess } from "./getBackendFrameworks";
import { getFrontendFrameworksSuccess } from "./getFrontendFrameworks";
import { getPagesOptionsSuccess } from "./getPagesOptions";

import getFrontendFrameworks from "../mockData/frontendFrameworks";
import getBackendFrameworks from "../mockData/backendFrameworks";

/**
 * Redux-thunk action that dispatches multiple actions to load
 * the content for the wizard.
 *
 */
const loadWizardContentAction = () => {
  return async (dispatch: any) => {
    // TODO: Do fetch request here, dispatch success or failure

    const frontendOptions = await getFrontendFrameworks();
    dispatch(getFrontendFrameworksSuccess(frontendOptions));

    const backendOptions = await getBackendFrameworks();
    dispatch(getBackendFrameworksSuccess(backendOptions));
  };
};

export { loadWizardContentAction };
