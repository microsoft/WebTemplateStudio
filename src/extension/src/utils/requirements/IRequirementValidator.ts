interface IRequirementValidator {
  isInstalled: () => Promise<boolean>;
}
