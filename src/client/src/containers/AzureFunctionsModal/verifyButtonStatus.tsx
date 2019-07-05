export const setFunctionsModalButtonStatus = (
  selections: any,
  isValidatingName: boolean,
  appNameAvailability: any,
  setFormIsSendable: (status: boolean) => void,
  chooseExistingRadioButtonSelected: boolean
): boolean => {
  let isSubscriptionEmpty: boolean = false;
  let isResourceGroupEmpty: boolean = false;
  let isAppNameEmpty: boolean = false;
  let isLocationEmpty: boolean = false;
  let isNumFunctionsZero: boolean = false;
  let isRuntimeStackEmpty: boolean = false;
  let isAnyEmpty: boolean = false;

  isSubscriptionEmpty = selections.subscription.value === "";
  isResourceGroupEmpty = selections.resourceGroup.value === "";
  isAppNameEmpty = selections.appName.value === "";
  isNumFunctionsZero = selections.numFunctions.value === 0;
  isLocationEmpty = selections.location.value === "";
  isRuntimeStackEmpty = selections.runtimeStack.value === "";

  if (!chooseExistingRadioButtonSelected) {
    isResourceGroupEmpty = false;
  }

  isAnyEmpty =
    isSubscriptionEmpty ||
    isResourceGroupEmpty ||
    isAppNameEmpty ||
    isLocationEmpty ||
    isRuntimeStackEmpty ||
    isNumFunctionsZero;

  const { isAppNameAvailable } = appNameAvailability;

  const isDisabled = isAnyEmpty || isValidatingName || !isAppNameAvailable;

  setFormIsSendable(!isDisabled);

  return isDisabled;
};
