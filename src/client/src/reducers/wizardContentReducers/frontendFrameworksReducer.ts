import * as Actions from "../../actions/types";

/* State Shape
{
    frontendOptions: []
}
*/

const frontendOptions = (state = [], action: any) => {
<<<<<<< HEAD:src/client/src/reducers/wizardContentReducers/frontendFrameworksReducer.ts
    switch(action.type) {
        case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
            return action.payload;
        case Actions.GET_FRONTEND_FRAMEWORKS:
        default:
            return state;
    }
}
=======
  switch (action.type) {
    case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
>>>>>>> 1fa2f9f... Initial attempt at linking projecttypes:src/client/src/reducers/wizardContent/frontendFrameworksReducer.ts

export default frontendOptions;
