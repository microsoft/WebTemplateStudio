import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";

const getSubscriptions = (state: AppState): Subscription[] => state.azureProfileData.profileData.subscriptions;

const getDropdownSubscriptions = createSelector([getSubscriptions], subscriptions => {
  return subscriptions.map(subscription => {
    return {
      label: subscription.name,
      value: subscription.name,
    };
  }) as IDropDownOptionType[];
});

export { getSubscriptions, getDropdownSubscriptions };
