import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";
import { IOption } from "../../types/option";

/* State Shape
{
    backendOptions: []
}
*/

const backendFrameworkOptions = (
  state: IOption[] = [],
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.GET_BACKEND_FRAMEWORKS_SUCCESS:
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
