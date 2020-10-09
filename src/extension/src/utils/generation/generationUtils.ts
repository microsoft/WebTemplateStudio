import { IAppService, ICosmosDB, IGenerationData, SERVICE_CATEGORY, SERVICE_TYPE } from "../../types/generationTypes";

export const getGenerationData = (data: any): IGenerationData => {
  const generationData: IGenerationData = {
    backendFramework: data.backendFramework,
    frontendFramework: data.frontendFramework,
    backendFrameworkLinuxVersion: data.backendFrameworkLinuxVersion,
    pages: data.pages,
    path: data.path,
    projectName: data.projectName,
    projectType: data.projectType,
    services: [],
  };

  if (data.services?.appService) {
    const { internalName, subscription, resourceGroup, location, siteName } = data.services.appService;

    const appService: IAppService = {
      internalName,
      category: SERVICE_CATEGORY.AZURE,
      type: SERVICE_TYPE.APPSERVICE,
      subscription,
      resourceGroup,
      location,
      serviceName: siteName,
    };
    generationData.services?.push(appService);
  }

  if (data.services?.cosmosDB) {
    const { internalName, subscription, resourceGroup, location, accountName, api } = data.services.cosmosDB;

    const cosmosDB: ICosmosDB = {
      internalName,
      category: SERVICE_CATEGORY.AZURE,
      type: SERVICE_TYPE.COSMOSDB,
      subscription,
      resourceGroup,
      location,
      serviceName: accountName,
      api,
    };
    generationData.services?.push(cosmosDB);
  }

  return generationData;
};
