import { PLATFORM, ROUTE } from "../constants/constants";
import { IRoutesNavItems } from "../../types/route";
import messages from "./messages";


const NavItemsWeb: IRoutesNavItems[] = [
  { route: ROUTE.NEW_PROJECT, isSelected: true, wasVisited: true, index: 0, messageDescriptor: messages.welcome },
  {
    route: ROUTE.SELECT_FRAMEWORKS,
    isSelected: false,
    wasVisited: false,
    index: 1,
    messageDescriptor: messages.frameworks,
  },
  { route: ROUTE.ADD_PAGES, isSelected: false, wasVisited: false, index: 2, messageDescriptor: messages.pages },
  { route: ROUTE.ADD_SERVICES, isSelected: false, wasVisited: false, index: 3, messageDescriptor: messages.services },
  {
    route: ROUTE.REVIEW_AND_GENERATE,
    isSelected: false,
    wasVisited: false,
    index: 4,
    messageDescriptor: messages.summary,
  },
];

const NavItemsRN: IRoutesNavItems[] = [
  { route: ROUTE.NEW_PROJECT, isSelected: true, wasVisited: true, index: 0, messageDescriptor: messages.welcome },
  {
    route: ROUTE.SELECT_PROJECT_TYPE,
    isSelected: false,
    wasVisited: false,
    index: 1,
    messageDescriptor: messages.projectType,
  },
  { route: ROUTE.ADD_PAGES, isSelected: false, wasVisited: false, index: 2, messageDescriptor: messages.pages },
  {
    route: ROUTE.REVIEW_AND_GENERATE,
    isSelected: false,
    wasVisited: false,
    index: 3,
    messageDescriptor: messages.summary,
  },
];

export const getNavItems = (platform: string): IRoutesNavItems[] => {
  let routes: IRoutesNavItems[] = [];
  if (platform === PLATFORM.WEB) routes = NavItemsWeb;
  if (platform === PLATFORM.RN) routes = NavItemsRN;
  return routes;
}