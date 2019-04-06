export const setAzureModalValidation = (
  selections: any,
  isValidatingName: boolean,
  appNameAvailability: any,
  updateValidation: (selectionIsEmptyBooleans: any) => void
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
  isRuntimeStackEmpty = selections.runtimeStack.value == "";

  isAnyEmpty =
    isSubscriptionEmpty ||
    isResourceGroupEmpty ||
    isAppNameEmpty ||
    isLocationEmpty ||
    isRuntimeStackEmpty ||
    isNumFunctionsZero;

  const { message } = appNameAvailability;
  const appNameErrorExists = message != null && message.length > 0;

  updateValidation({
    isSubscriptionEmpty: isSubscriptionEmpty,
    isResourceGroupEmpty: isResourceGroupEmpty,
    isAppNameEmpty: isAppNameEmpty,
    isNumFunctionsZero: isNumFunctionsZero,
    isLocationEmpty: isLocationEmpty,
    isRuntimeStackEmpty: isRuntimeStackEmpty
  });
  return isAnyEmpty || appNameErrorExists || isValidatingName;
};
