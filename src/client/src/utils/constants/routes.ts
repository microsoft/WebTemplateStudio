import { IRoutesNavItems } from "../../types/route";
import messages from "./messages";

const ROUTE = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS: "/SelectFrameworks",
  SELECT_PROJECT_TYPE: "/SelectProjectType",
  ADD_PAGES: "/AddPages",
  ADD_SERVICES: "/AddServices",
  REVIEW_AND_GENERATE: "/ReviewAndGenerate",
  NEW_PROJECT: "/",
};

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

export { ROUTE, NavItemsWeb, NavItemsRN };
