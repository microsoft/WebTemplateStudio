import { IRoutesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";

const projectTypesOptions = (state: string[] = [], action: IRoutesActionType) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypesOptions;