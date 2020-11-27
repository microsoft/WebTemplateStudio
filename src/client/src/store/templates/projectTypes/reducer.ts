import { IProjectTypesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IOption } from "../../../types/option";

const projectTypesOptions = (state: IOption[] = [], action: IProjectTypesActionType) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypesOptions;
