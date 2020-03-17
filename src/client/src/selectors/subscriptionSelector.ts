import { createSelector } from "reselect";

const getSubscriptions = (state: any): Subscription[] => state.azureProfileData.profileData.subscriptions;

const getDropdownSubscriptions = createSelector([getSubscriptions], subscriptions => {
  return subscriptions.map(subscription => {
    return {
      label: subscription.name,
      value: subscription.name,
    };
  }) as IDropDownOptionType[];
});

export { getSubscriptions, getDropdownSubscriptions };
