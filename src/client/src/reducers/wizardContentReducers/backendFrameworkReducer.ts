import * as Actions from "../../actions/types";

/* State Shape
{
    backendOptions: []
}
*/

const backendFrameworkOptions = (state: any = [], action: any) => {
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
      newState.sort(
        (a: any, b: any): number => {
          if (a.unselectable) {
            return 1;
          }
          if (b.unselectable) {
            return -1;
          }
          return 0;
        }
      );
      return newState;
    default:
      return state;
  }
};

export default backendFrameworkOptions;
