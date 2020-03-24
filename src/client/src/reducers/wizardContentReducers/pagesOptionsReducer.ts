import WizardContentActionType from "../../store/wizardContent/wizardContentActionType";
import { IOption } from "../../types/option";
import { IResetPagesAction } from "../../store/selection/pages/model";
import { WIZARD_CONTENT_TYPEKEYS } from "../../store/wizardContent/typeKeys";

const pageOptions = (
  state: IOption[] = [],
  action: WizardContentActionType | IResetPagesAction
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default pageOptions;
