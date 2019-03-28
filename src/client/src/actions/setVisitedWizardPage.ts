import * as Actions from "./types";

export const setVisitedWizardPageAction = (route: string) => ({
  type: Actions.SET_VISITED_WIZARD_PAGE,
  payload: route
});
