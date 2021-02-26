import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IProjectTypesActionType } from "./models";

const projectTypesOptions = (state: IOption[] = [], action: IProjectTypesActionType): IOption[] => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypesOptions;
