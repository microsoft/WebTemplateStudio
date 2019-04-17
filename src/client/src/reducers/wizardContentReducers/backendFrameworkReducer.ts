import * as Actions from "../../actions/types";
import { IOption } from "../../types/option";

/* State Shape
{
    backendOptions: []
}
*/

const backendFrameworkOptions = (state: IOption[] = [], action: any) => {
  switch (action.type) {
    case Actions.GET_BACKEND_FRAMEWORKS_SUCCESS:
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
    default:
      return state;
  }
};

export default backendFrameworkOptions;
