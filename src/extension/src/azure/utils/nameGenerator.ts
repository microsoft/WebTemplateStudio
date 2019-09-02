import { SubscriptionItem } from "../azure-auth/azureAuth";
import { AzureResourceType, CONSTANTS } from "../../constants";

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
    return NameGenerator.generateName(projectName, azureType);
  }

  export function generateName(
    userProjectName: string,
    azureType?: AzureResourceType
  ): string {
    const timestamp = unixToSuffix(Date.now());
    const suffix: string = "-" + timestamp;
    return trimProjectName(userProjectName, azureType) + suffix;
  }

  function trimProjectName(
    projectName: string,
    azureType?: AzureResourceType
  ): string {
    const suffixLength = 15; // format of suffix is "-yyyymmddhhmmss"
    if (azureType === AzureResourceType.AppServicePlan) {
      return projectName.substr(
        0,
        CONSTANTS.APP_SERVICE_PLAN_NAME.MAX_LENGTH - suffixLength
      );
    }
    return projectName;
  }

  function unixToSuffix(unixTimestamp: any): string {
    const fullDate = new Date(unixTimestamp);
    const year = fullDate.getFullYear().toString();
    // getMonth() returns month as a zero-based value
    const month = padStart(fullDate.getMonth() + 1);
    const date = padStart(fullDate.getDate());
    const hour = padStart(fullDate.getHours());
    const min = padStart(fullDate.getMinutes());
    const sec = padStart(fullDate.getSeconds());
    return year.concat(month, date, hour, min, sec);
  }

  function padStart(x: number): string {
    return x.toString().padStart(2, "0");
  }
}
