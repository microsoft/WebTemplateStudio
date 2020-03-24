import { IAzureValidationStatus, IGetSubscription } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const setAzureValidationStatusAction = (
    status: boolean
  ): IAzureValidationStatus => ({
    payload: status,
    type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS
  });

export const getSubscriptionData = (subscriptionData: any): IGetSubscription => ({
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA,
  payload: subscriptionData
});
