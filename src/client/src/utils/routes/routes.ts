import { NavItemsWeb } from "../constants/routes";
import { IRoutesNavItems } from "../../types/route";

export const getNavItems = (platform: string): IRoutesNavItems[] => {
  let routes: IRoutesNavItems[] = [];
  if (platform === "Web") routes = NavItemsWeb;
  return routes;
}