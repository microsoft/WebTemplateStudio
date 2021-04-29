import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

export interface IFeaturesActionType {
  type: TEMPLATES_TYPEKEYS.SET_FEATURES;
  payload: IOption[];
}
