import { IFeaturesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IOption } from "../../../types/option";

const featureOptions = (state: IOption[] = [], action: IFeaturesActionType) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_FEATURES:
      return action.payload;
    default:
      return state;
  }
};

export default featureOptions;
