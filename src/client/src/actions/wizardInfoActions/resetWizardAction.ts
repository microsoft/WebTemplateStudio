import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IResetWizard {
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD;
}

const resetWizardAction = (): IResetWizard => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export { resetWizardAction };
