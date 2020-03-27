import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";

const getSubscriptionsSelector = (state: AppState): Subscription[] => state.azureProfileData.profileData.subscriptions;

const getDropdownSubscriptionsSelector = createSelector([getSubscriptionsSelector], subscriptions => {
  return subscriptions.map(subscription => {
    return {
      label: subscription.name,
      value: subscription.name,
    };
  }) as IDropDownOptionType[];
});

export { getSubscriptionsSelector, getDropdownSubscriptionsSelector };
