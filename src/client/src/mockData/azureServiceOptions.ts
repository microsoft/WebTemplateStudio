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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Consectetur adipiscing elit, sed do eiusmod tempor incididunt."
  },
  {
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB),
    title: "Cosmos Resource",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Consectetur adipiscing elit, sed do eiusmod tempor incididunt."
  }
];

const getAzureServiceOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getAzureServiceOptions;
