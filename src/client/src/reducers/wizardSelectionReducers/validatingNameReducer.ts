import * as Actions from "../../actions/types";
const setValidationStatus = (state = false, action: any) => {
  switch (action.type) {
    case Actions.SET_VALIDATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default setValidationStatus;
