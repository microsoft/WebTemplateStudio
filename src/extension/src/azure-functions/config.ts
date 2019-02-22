export interface Config {
  functionAppApiPath: string;
  functionAppDomain: string;
  functionZipPath: string;
  functionTemplatesRelativePath: string;
  baseNodeFunctionPath: string;
  baseNodeFunctionConfigPath: string;
  appNodeSettingsPath: string;
}

export const config: Config = {
  functionAppApiPath: '/api/',
  functionAppDomain: '.azurewebsites.net',
  functionZipPath: '.scm.azurewebsites.net/api/zipdeploy',
  functionTemplatesRelativePath: '/src/azure-functions/templates',
  baseNodeFunctionPath: '/base/node/index.js',
  baseNodeFunctionConfigPath: '/base/node/function.json',
  appNodeSettingsPath: '/app/node'
};