import * as Actions from "./types";

export const getSubscriptionData = (subscriptionData: any) => ({
    type: Actions.GET_SUBSCRIPTION_DATA,
    payload: subscriptionData
});

