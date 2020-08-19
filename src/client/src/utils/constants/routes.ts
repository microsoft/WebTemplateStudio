import { IRoutesNavItems } from "../../types/route";
import { defineMessages } from "react-intl";

const ROUTE = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS:  "/SelectFrameworks",
  ADD_PAGES: "/AddPages",
  ADD_SERVICES: "/AddServices",
  REVIEW_AND_GENERATE :"/ReviewAndGenerate",
  NEW_PROJECT: "/"
};

const messages = defineMessages({
  frameworks: {
    id: "topNavBar.frameworks",
    defaultMessage: "Add Frameworks"
  },
  pages: {
    id: "topNavBar.pages",
    defaultMessage: "Add Pages"
  },
  services: {
    defaultMessage: "Add Optional Cloud Services",
    id: "topNavBar.services"
  },
  summary: {
    defaultMessage: "Summary",
    id: "topNavBar.summary"
  },
  welcome: {
    defaultMessage: "New Project",
    id: "topNavBar.newProject"
  }
});

const NavItemsWeb: IRoutesNavItems[] = [
  {route:ROUTE.NEW_PROJECT, isSelected:true, wasVisited: true, index:0, messageDescriptor: messages.welcome},
  {route:ROUTE.SELECT_FRAMEWORKS, isSelected:false, wasVisited: false, index:1, messageDescriptor:messages.frameworks},
  {route:ROUTE.ADD_PAGES, isSelected:false, wasVisited: false, index:2, messageDescriptor:messages.pages},
  {route:ROUTE.ADD_SERVICES, isSelected:false, wasVisited: false, index:3, messageDescriptor:messages.services},
  {route:ROUTE.REVIEW_AND_GENERATE, isSelected:false, wasVisited: false, index:4, messageDescriptor:messages.summary},
];

export {
  ROUTE,
  NavItemsWeb,
  messages
};