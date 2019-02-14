import * as Actions from "./types";

import { getFrontendFrameworksSuccess } from "./getFrontendFrameworks";
import { getPagesOptionsSuccess } from "./getPagesOptions";
import { getWebAppOptionsSuccess } from "./getWebAppOptions";

import getFakePagesOptions from "../mockData/pagesOptions";
import getFakeWebAppOptions from "../mockData/webAppOptions";
import getFakeFrontendFrameworks from "../mockData/frontendFrameworks";

const getWebAppOptions = () => {
  return {
    type: Actions.GET_WEB_APP_OPTIONS,
  };
};

// thunk
const loadWizardContentAction = () => {
    return async (dispatch: any) => {
        // TODO: Do fetch request here, dispatch success or failure
        const webAppOptions = await getFakeWebAppOptions();
        dispatch(getWebAppOptionsSuccess(webAppOptions));

        const pagesOptions = await getFakePagesOptions();
        dispatch(getPagesOptionsSuccess(pagesOptions));

        const frontendFrameworks = await getFakeFrontendFrameworks();
        dispatch(getFrontendFrameworksSuccess(frontendFrameworks));
    };
};

export { getWebAppOptions, loadWizardContentAction };
