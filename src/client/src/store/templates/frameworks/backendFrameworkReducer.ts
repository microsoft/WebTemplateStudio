import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../../typeKeys";
import RootAction from "../../ActionType";

const backendFrameworkOptions = (
  state: IOption[] = [],
  action: RootAction
) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_BACKEND_FRAMEWORKS:
      const newState = [...state];
      for (const frameworkToAdd of action.payload) {
        let found = false;
        for (const framework of newState) {
          if (framework.internalName === frameworkToAdd.internalName) {
            found = true;
          }
        }
        if (!found) {
          newState.push(frameworkToAdd);
        }
      }
      return newState;
    case TEMPLATES_TYPEKEYS.UPDATE_FRAMEWORK:
      const newStateUpdate = [...state];
      for (const frameworkToUpdate of action.payload) {
        newStateUpdate.filter((framework)=> framework.internalName === frameworkToUpdate.internalName)[0] = frameworkToUpdate;
      }
      return newStateUpdate;
    default:
      return state;
  }
};

export default backendFrameworkOptions;
