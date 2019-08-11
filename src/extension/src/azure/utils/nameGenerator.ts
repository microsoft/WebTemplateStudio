import { SubscriptionItem } from "../azure-auth/azureAuth";
import { AzureResourceType, CONSTANTS } from "../../constants";
import { AzureServices } from "../azureServices";

export namespace NameGenerator {
  export async function generateValidAzureTypeName(
    projectName: string,
    userSubscriptionItem: SubscriptionItem,
    azureType: AzureResourceType
  ): Promise<string> {
    // valid name can only have alphanumeric characters and dashes
    // this regex replaces all non-alphanumeric characters and underscores with dashes
    projectName = projectName.replace(/[W_]+/g, "-");

    if (azureType === AzureResourceType.Cosmos) {
      // Cosmos DB Account name can only have lowercase characters
      projectName = projectName.toLowerCase();
    }

    let result = NameGenerator.generateName(projectName, azureType);
    let isValid: boolean = await AzureServices.validateNameForAzureType(
      projectName,
      userSubscriptionItem,
      azureType
    );

    let tries = 0;
    while (tries < CONSTANTS.VALIDATION_LIMIT && !isValid) {
      result = NameGenerator.generateName(projectName, azureType);
      isValid = await AzureServices.validateNameForAzureType(
        projectName,
        userSubscriptionItem,
        azureType
      );
      tries++;
    }

    return result;
  }

  export function generateName(
    userProjectName: string,
    azureType?: AzureResourceType
  ): string {
    let result;
    const timestamp = unixToSuffix(Date.now());
    result = userProjectName + "-" + timestamp;
    if (
      azureType === AzureResourceType.Functions ||
      azureType === AzureResourceType.AppService
    ) {
      return result.substr(0, CONSTANTS.APP_NAME.MAX_LENGTH);
    }
    if (azureType === AzureResourceType.Cosmos) {
      return result.substr(0, CONSTANTS.COSMOS_DB_NAME.MAX_LENGTH);
    } else {
      return result;
    }
  }

  function unixToSuffix(unixTimestamp: any): string {
    const fullDate = new Date(unixTimestamp);
    const year = fullDate.getFullYear().toString();
    // getMonth() returns month as a zero-based value
    const month = (fullDate.getMonth() + 1).toString();
    const date = fullDate.getDate().toString();
    const hour = fullDate.getHours().toString();
    const min = fullDate.getMinutes().toString();
    const sec = fullDate.getSeconds().toString();
    return year.concat(month, date, hour, min, sec);
  }
}
