import { IResetWizard } from "./model";
import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";

const resetWizardAction = (): IResetWizard => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export { resetWizardAction };
