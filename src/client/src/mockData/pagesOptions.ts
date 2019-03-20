import { IOption } from "../types/option";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";
import svgUrlLoader from "../utils/getSvgUrl";

const options: IOption[] = [
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE),
    title: "Blank Page",
    originalTitle: "Blank Page",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false
  },
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL),
    title: "Master Detail",
    originalTitle: "Master Detail",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.MASTER_DETAIL,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false
  },
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.CONTENT_GRID),
    title: "Content Grid",
    originalTitle: "Content Grid",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.CONTENT_GRID,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false
  },
  {
    svgUrl: svgUrlLoader(WIZARD_CONTENT_INTERNAL_NAMES.LIST),
    title: "List",
    originalTitle: "List",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.LIST,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    selected: false
  }
];

const getPagesOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getPagesOptions;
