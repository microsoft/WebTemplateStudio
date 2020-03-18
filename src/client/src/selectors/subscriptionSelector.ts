import { createSelector } from "reselect";

const DEFAULT_SUBSCRIPTION_VALUE = {
  value: "Select...",
  label: "Select...",
};

const getSubscriptions = (state: any): Subscription[] => state.azureProfileData.profileData.subscriptions;

const getDropdownSubscriptions = createSelector([getSubscriptions], subscriptions => {
  const dropdownSubscriptions = subscriptions.map(subscription => {
    return {
      label: subscription.name,
      value: subscription.name,
    };
  }) as IDropDownOptionType[];

  dropdownSubscriptions.unshift(DEFAULT_SUBSCRIPTION_VALUE)
  return dropdownSubscriptions;
});

export { getSubscriptions, getDropdownSubscriptions };
