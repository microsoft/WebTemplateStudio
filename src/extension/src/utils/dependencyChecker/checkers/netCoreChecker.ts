
export default class NetCoreChecker implements IDependencyChecker {
    public async hasDependency() {
        return await new Promise<boolean>(() => true);
    }
  }