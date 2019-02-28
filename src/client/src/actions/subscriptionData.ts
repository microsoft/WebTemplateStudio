import * as Actions from "./types";

export const getSubscriptionData = (subscriptionData: any) => ({
    type: Actions.SELECT_SUBSCRIPTION,
    payload: subscriptionData
});

