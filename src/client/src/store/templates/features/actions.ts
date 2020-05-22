import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IFeaturesActionType } from "./models";
import { IOption } from "../../../types/option";

const setFeaturesAction = (features: IOption[]): IFeaturesActionType => ({
  payload: features,
  type: TEMPLATES_TYPEKEYS.SET_FEATURES,
});

export { setFeaturesAction };
