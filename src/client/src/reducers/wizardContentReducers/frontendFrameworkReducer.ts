import * as Actions from "../../actions/types";

/* State Shape
{
    frontendOptions: []
}
*/

const frontendFrameworkOptions = (state: any = [], action: any) => {
  switch (action.type) {
    case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
      /**
       * FIXME: Remove once all data is completely supplied through core engine
       * Code is used to concatenate unselectable frameworks from
       * mockData and selectable frameworks from engine and sort
       * so that selectable items appear first.
       *
       * If all data is coming from the engine then this shouldn't be
       * required.
       */
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

export default frontendFrameworkOptions;
