import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IOption } from "../../../types/option";

export interface IFeaturesActionType {
  type: TEMPLATES_TYPEKEYS.SET_FEATURES;
  payload: IOption[];
}
