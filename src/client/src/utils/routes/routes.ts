import { NavItemsWeb } from "../constants/routes";
import { IRoutesNavItems } from "../../types/route";
import { PLATFORM } from "../constants/constants";

export const getNavItems = (platform: string): IRoutesNavItems[] => {
  let routes: IRoutesNavItems[] = [];
  if (platform === PLATFORM.WEB) routes = NavItemsWeb;
  return routes;
}