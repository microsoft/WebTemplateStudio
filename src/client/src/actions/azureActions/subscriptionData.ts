import { AZURE_TYPEKEYS } from "./typeKeys";

export const getSubscriptionData = (subscriptionData: any) => ({
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA,
  payload: subscriptionData
});
