import WizardContentActionType from "../templatesActionType";
import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

const pageOptions = (
  state: IOption[] = [],
  action: WizardContentActionType
) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default pageOptions;
