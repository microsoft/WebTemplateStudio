export interface Config {
  functionAppApiPath:             string;
  functionAppDomain:              string;
  functionTemplatesRelativePath:  string;
  baseNodeFunctionPath:           string;
  baseNodeFunctionConfigPath:     string;
  appNodeSettingsPath:            string;
}

export const config: Config = {
    functionAppApiPath:             '/api/',
    functionAppDomain:              '.azurewebsites.net',
    functionTemplatesRelativePath:  '/src/azure-functions/templates',
    baseNodeFunctionPath:           '/base/node/index.js',
    baseNodeFunctionConfigPath:     '/base/node/function.json',
    appNodeSettingsPath:            '/app/node'
};