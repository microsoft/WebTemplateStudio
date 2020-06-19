interface IDependencyChecker {
  hasDependency: () => Promise<boolean>;
}
