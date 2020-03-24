import { AZURE_TYPEKEYS } from "./typeKeys";

export interface IGetSubscription {
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA;
  payload: SubscriptionData;
}

export const getSubscriptionData = (subscriptionData: SubscriptionData): IGetSubscription => ({
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA,
  payload: subscriptionData
});
