import { NavItemsWeb } from "../constants/routes";

export const getRoutes = (platform: string): string[] => {
  let routes:string[] = [];
  if (platform === "Web") routes = NavItemsWeb;
  return routes;
}