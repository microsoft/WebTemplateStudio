import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IFeaturesActionType } from "./models";

const featureOptions = (state: IOption[] = [], action: IFeaturesActionType): IOption[] => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_FEATURES:
      return action.payload;
    default:
      return state;
  }
};

export default featureOptions;
