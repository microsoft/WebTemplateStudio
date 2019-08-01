import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import { IEnableQuickStart } from "../../actions/wizardInfoActions/enableQuickStartAction";

const enableQuickStart = (
  state: boolean = false,
  action: IEnableQuickStart
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.ENABLE_QUICK_START:
      return true;
    default:
      return state;
  }
};

export default enableQuickStart;
