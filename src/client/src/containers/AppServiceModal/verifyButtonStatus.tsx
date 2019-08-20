import { IAppServiceState } from "./index";
import { IAvailability } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";

export const setAppServiceModalButtonStatus = (
  selections: IAppServiceState,
  isValidatingName: boolean,
  siteNameAvailability: IAvailability,
  setFormIsSendable: (status: boolean) => void
): boolean => {
  let isSubscriptionEmpty: boolean = false;
  let isSiteNameEmpty: boolean = false;
  let isAnyEmpty: boolean = false;

  isSubscriptionEmpty = selections.subscription.value === "";
  isSiteNameEmpty = selections.siteName.value === "";

  isAnyEmpty = isSubscriptionEmpty || isSiteNameEmpty;

  const { isSiteNameAvailable } = siteNameAvailability;

  const isDisabled = isAnyEmpty || isValidatingName || !isSiteNameAvailable;

  setFormIsSendable(!isDisabled);

  return isDisabled;
};
