import { IProjectTypesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

const projectTypesOptions = (state: string[] = [], action: IProjectTypesActionType) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypesOptions;