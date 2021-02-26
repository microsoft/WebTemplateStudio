import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IFeaturesActionType } from "./models";

const setFeaturesAction = (features: IOption[]): IFeaturesActionType => ({
  payload: features,
  type: TEMPLATES_TYPEKEYS.SET_FEATURES,
});

export { setFeaturesAction };
