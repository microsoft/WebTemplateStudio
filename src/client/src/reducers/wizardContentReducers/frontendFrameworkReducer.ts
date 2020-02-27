import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";
import { IOption } from "../../types/option";

/* State Shape
{
    frontendOptions: []
}
*/

const frontendFrameworkOptions = (
  state: IOption[] = [],
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS:
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
    case WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK:
      const newStateUpdate = [...state];
      for (const frameworkToUpdate of action.payload) {
        newStateUpdate.filter((framework)=> framework.internalName === frameworkToUpdate.internalName)[0] = frameworkToUpdate;
      }
      return newStateUpdate;
    default:
      return state;
  }
};

export default frontendFrameworkOptions;
