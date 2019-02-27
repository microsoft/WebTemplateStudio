import * as Actions from "./types";

export const getSubscriptionData = (subscriptionData: any) => ({
    type: Actions.SUBSCRIPTION_SELECT,
    payload: subscriptionData
});

