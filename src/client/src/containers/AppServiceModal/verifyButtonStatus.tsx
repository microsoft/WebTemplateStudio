export const setAppServiceModalButtonStatus = (
  selections: any,
  isValidatingName: boolean,
  siteNameAvailability: any,
  setFormIsSendable: (status: boolean) => void
): boolean => {
  let isSubscriptionEmpty: boolean = false;
  let isResourceGroupEmpty: boolean = false;
  let isSiteNameEmpty: boolean = false;
  let isAnyEmpty: boolean = false;

  isSubscriptionEmpty = selections.subscription.value === "";
  isResourceGroupEmpty =
    selections.chooseExistingRadioButtonSelected &&
    selections.resourceGroup.value === "";
  isSiteNameEmpty = selections.siteName.value === "";

  isAnyEmpty = isSubscriptionEmpty || isResourceGroupEmpty || isSiteNameEmpty;

  const { isSiteNameAvailable } = siteNameAvailability; // TODO

  const isDisabled = isAnyEmpty || isValidatingName || !isSiteNameAvailable;

  setFormIsSendable(!isDisabled);

  return isDisabled;
};
