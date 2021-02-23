export interface IPackageSource {
  getLatestVersion: (packageName: string) => Promise<string>;
}
