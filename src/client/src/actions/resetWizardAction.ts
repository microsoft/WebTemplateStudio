export const RESET_WIZARD = "RESET_WIZARD";

export interface IRESET_WIZARD {
  type: "RESET_WIZARD";
}

const resetWizardAction = (): IRESET_WIZARD => ({
  type: RESET_WIZARD
});

export { resetWizardAction };
