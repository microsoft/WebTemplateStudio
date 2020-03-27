import { IAzureValidationStatusAction, IGetSubscriptionAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const setAzureValidationStatusAction = (
    status: boolean
  ): IAzureValidationStatusAction => ({
    payload: status,
    type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS
  });

  export const getSubscriptionData = (subscriptionData: SubscriptionData): IGetSubscriptionAction => ({
    type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA,
    payload: subscriptionData
  });
