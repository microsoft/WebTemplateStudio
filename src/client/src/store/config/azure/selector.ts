import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";

const isLoggedInSelector = (state: AppState): boolean => state.config.azureProfileData.email !== "";

const getSubscriptionsSelector = (state: AppState): Subscription[] => state.config.azureProfileData.subscriptions;

const getDropdownSubscriptionsSelector = createSelector([getSubscriptionsSelector], (subscriptions) => {
  return subscriptions.map((subscription) => {
    return {
      label: subscription.name,
      value: subscription.name,
    };
  }) as IDropDownOptionType[];
});

export { isLoggedInSelector, getSubscriptionsSelector, getDropdownSubscriptionsSelector };
