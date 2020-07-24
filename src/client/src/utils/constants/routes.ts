const ROUTES = {
  PAGE_DETAILS: "/PageDetail",
  SELECT_FRAMEWORKS:  "/SelectFrameworks",
  SELECT_PAGES: "/SelectPages",
  ADD_SERVICES: "/AddPages",
  REVIEW_AND_GENERATE :"/ReviewAndGenerate",
  NEW_PROJECT: "/"
};

const routesWeb = [
  ROUTES.NEW_PROJECT,
  ROUTES.SELECT_FRAMEWORKS,
  ROUTES.SELECT_PAGES,
  ROUTES.ADD_SERVICES,
  ROUTES.REVIEW_AND_GENERATE
];

const getRoutes = (platform: string): string[] => {
  let routes:string[] = [];
  if (platform === "Web") routes = routesWeb;
  return routes;
}

export {
  ROUTES,
  getRoutes
};