export const setCosmosModalValidation = (
  selections: any,
  isValidatingName: boolean,
  accountNameAvailability: any,
  updateValidation: (selectionIsEmptyBooleans: any) => void
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

  const { message } = accountNameAvailability;
  const accountNameErrorExists = message != null && message.length > 0;

  updateValidation({
    isSubscriptionEmpty: isSubscriptionEmpty,
    isResourceGroupEmpty: isResourceGroupEmpty,
    isLocationEmpty: isLocationEmpty,
    isAccountNameEmpty: isAccountNameEmpty,
    isApiEmpty: isApiEmpty
  });
  return isAnyEmpty || isValidatingName || accountNameErrorExists;
};
