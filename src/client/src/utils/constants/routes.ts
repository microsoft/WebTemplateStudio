import { defineMessages } from "react-intl";


const ROUTES = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS:  "/SelectFrameworks",
  SELECT_PAGES: "/SelectPages",
  ADD_SERVICES: "/AddPages",
  REVIEW_AND_GENERATE :"/ReviewAndGenerate",
  NEW_PROJECT: "/"
};


// Presents the routes in the order of the wizard
const ROUTES_ARRAY = [
  ROUTES.NEW_PROJECT,
  ROUTES.SELECT_FRAMEWORKS,
  ROUTES.SELECT_PAGES,
  ROUTES.ADD_SERVICES,
  ROUTES.REVIEW_AND_GENERATE
];


export {
  ROUTES,
  ROUTES_ARRAY
};