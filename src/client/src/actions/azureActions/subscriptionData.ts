import { AZURE_TYPEKEYS } from "./typeKeys";

export interface IGetSubscription {
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA;
  payload: any;
}

export const getSubscriptionData = (subscriptionData: any): IGetSubscription => ({
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA,
  payload: subscriptionData
});
