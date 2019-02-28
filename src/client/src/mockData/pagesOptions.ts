import { IOption } from "../types/option";
import svgUrlLoader from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

const options: IOption[] = [
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL),
    title: "Master Detail",
    originalTitle: "Master Detail",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL,
    body:
      "The introductory page of a website, typically serving as a table of contents for a site.",
    selected: false
  },
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.CONTENT_GRID),
    title: "Content Grid",
    originalTitle: "Content Grid",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.CONTENT_GRID,
    body:
      "A discussion or an informational website consisting of discrete, often informational diary-style text entries",
    selected: false
  },
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.LIST),
    title: "List",
    originalTitle: "List",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.LIST,
    body:
      "A page used to allow the visitor to contact the website or people who are responsible for the maintenance of the site.",
    selected: false
  }
];

const getPagesOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getPagesOptions;
