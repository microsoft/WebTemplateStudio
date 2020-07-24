const ROUTE = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS:  "/SelectFrameworks",
  SELECT_PAGES: "/SelectPages",
  ADD_SERVICES: "/AddPages",
  REVIEW_AND_GENERATE :"/ReviewAndGenerate",
  NEW_PROJECT: "/"
};

const routesWeb = [
  ROUTE.NEW_PROJECT,
  ROUTE.SELECT_FRAMEWORKS,
  ROUTE.SELECT_PAGES,
  ROUTE.ADD_SERVICES,
  ROUTE.REVIEW_AND_GENERATE
];

const getRoutes = (platform: string): string[] => {
  let routes:string[] = [];
  if (platform === "Web") routes = routesWeb;
  return routes;
}

export {
  ROUTE,
  getRoutes
};