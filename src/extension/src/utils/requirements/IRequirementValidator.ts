interface IRequirementValidator {
  isInstalled: (minVersion: string) => Promise<boolean>;
}
