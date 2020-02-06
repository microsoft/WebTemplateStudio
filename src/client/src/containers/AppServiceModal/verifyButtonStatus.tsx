import { IAvailability, ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";

export const setAppServiceModalButtonStatus = (
  selections: ISelectedAppService,
  isValidatingName: boolean,
  siteNameAvailability: IAvailability,
  setFormIsSendable: (status: boolean) => void
): boolean => {
  let isSubscriptionEmpty: boolean = false;
  let isSiteNameEmpty: boolean = false;
  let isAnyEmpty: boolean = false;

  isSubscriptionEmpty = selections.subscription === "";
  isSiteNameEmpty = selections.siteName === "";

  isAnyEmpty = isSubscriptionEmpty || isSiteNameEmpty;

  const { isSiteNameAvailable } = siteNameAvailability;

  const isDisabled = isAnyEmpty || isValidatingName || !isSiteNameAvailable;

  setFormIsSendable(!isDisabled);

  return isDisabled;
};
