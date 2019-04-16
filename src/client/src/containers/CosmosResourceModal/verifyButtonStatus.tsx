export const setCosmosModalButtonStatus = (
  selections: any,
  isValidatingName: boolean,
  accountNameAvailability: any,
  setFormIsSendable: (status: boolean) => void
): boolean => {
  let isSubscriptionEmpty: boolean = false;
  let isResourceGroupEmpty: boolean = false;
  let isAccountNameEmpty: boolean = false;
  let isLocationEmpty: boolean = false;
  let isApiEmpty: boolean = false;
  let isAnyEmpty: boolean = false;

  isSubscriptionEmpty = selections.subscription.value === "";
  isResourceGroupEmpty = selections.resourceGroup.value === "";
  isAccountNameEmpty = selections.accountName.value === "";
  isApiEmpty = selections.api.value === "";
  isLocationEmpty = selections.location.value === "";

  isAnyEmpty =
    isSubscriptionEmpty ||
    isResourceGroupEmpty ||
    isAccountNameEmpty ||
    isLocationEmpty ||
    isApiEmpty;

  const { isAccountNameAvailable } = accountNameAvailability;
  
  const isDisabled =  isAnyEmpty || isValidatingName || !isAccountNameAvailable;
  
  setFormIsSendable(!isDisabled);

  return isDisabled;
};
