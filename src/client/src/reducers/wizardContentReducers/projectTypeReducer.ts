import WizardContentActionType from "../../store/wizardContent/wizardContentActionType";
import { IOption } from "../../types/option";
import { WIZARD_CONTENT_TYPEKEYS } from "../../store/wizardContent/typeKeys";

const projectTypes = (
  state: IOption[] = [],
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypes;
