import * as Actions from "./types";

import { getBackendFrameworksSuccess } from "./getBackendFrameworks";
import { getFrontendFrameworksSuccess } from "./getFrontendFrameworks";
import { getPagesOptionsSuccess } from "./getPagesOptions";
import { getWebAppOptionsSuccess } from "./getWebAppOptions";

import getFakeBackendFrameworks from "../mockData/backendFrameworks";
import getFakeFrontendFrameworks from "../mockData/frontendFrameworks";
import getFakePagesOptions from "../mockData/pagesOptions";
import getFakeWebAppOptions from "../mockData/webAppOptions";

const getWebAppOptions = () => {
  return {
    type: Actions.GET_WEB_APP_OPTIONS,
  };
};

/**
 * Redux-thunk action that dispatches multiple actions to load
 * the content for the wizard.
 * 
 */
const loadWizardContentAction = () => {
    return async (dispatch: any) => {
        // TODO: Do fetch request here, dispatch success or failure
        const webAppOptions = await getFakeWebAppOptions();
        dispatch(getWebAppOptionsSuccess(webAppOptions));

        const pagesOptions = await getFakePagesOptions();
        dispatch(getPagesOptionsSuccess(pagesOptions));

        const frontendFrameworks = await getFakeFrontendFrameworks();
        dispatch(getFrontendFrameworksSuccess(frontendFrameworks));

        const backendFrameworks = await getFakeBackendFrameworks();
        dispatch(getBackendFrameworksSuccess(backendFrameworks));
    };
};

export { getWebAppOptions, loadWizardContentAction };
