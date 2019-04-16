import * as Actions from "../../actions/types";

/* State Shape
{
    profileData: {}
}
*/

interface IAzureProfile {
  email: string | undefined;
  subscriptions: any;
}

const initialState = {
  email: undefined,
  subscriptions: {}
};

const profileData = (state: IAzureProfile = initialState, action: any) => {
  switch (action.type) {
    case Actions.LOG_OUT_OF_AZURE:
      return initialState;
    case Actions.LOG_IN_TO_AZURE:
      const newState = {
        ...state,
        email: action.payload.email,
        subscriptions: action.payload.subscriptions
      };
      return newState;
    default:
      return state;
  }
};

export default profileData;
