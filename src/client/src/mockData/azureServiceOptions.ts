import blankpage from "../assets/blankpage.svg";
import { IOption } from "../types/option";

import getSvgUrl from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

const options: IOption[] = [
  {
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS),
    title: "Azure Functions",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS,
    body:
      "Consider Azure functions for tasks like image or order processing, file maintenance, or for any tasks you want to run on a schedule."
  },
  {
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB),
    title: "Cosmos Resource",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    body:
      "An intelligent, fully managed relational cloud database service that provides the broadest SQL Server engine compatibility."
  }
];

const getAzureServiceOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getAzureServiceOptions;
