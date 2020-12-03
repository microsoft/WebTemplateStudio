import * as React from "react";
import loadable from "@loadable/component";
import { PAGES } from "./constants/internalNames";

const Masterdetailscreenshot = loadable(
  () => import(/* webpackChunkName: "Masterdetailscreenshot" */ "./svgComponents/Masterdetailscreenshot")
);
const Listscreenshot = loadable(
  () => import(/* webpackChunkName: "Listscreenshot" */ "./svgComponents/Listscreenshot")
);
const Gridscreenshot = loadable(
  () => import(/* webpackChunkName: "Gridscreenshot" */ "./svgComponents/Gridscreenshot")
);
const Blankscreenshot = loadable(
  () => import(/* webpackChunkName: "Blankscreenshot" */ "./svgComponents/Blankscreenshot")
);

const SVG_SCREENSHOT_MAPPINGS = {
  [PAGES.REACT_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [PAGES.ANGULAR_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [PAGES.VUE_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [PAGES.REACT_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [PAGES.ANGULAR_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [PAGES.VUE_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [PAGES.REACT_LIST]: (style: string) => <Listscreenshot style={style} />,
  [PAGES.ANGULAR_LIST]: (style: string) => <Listscreenshot style={style} />,
  [PAGES.VUE_LIST]: (style: string) => <Listscreenshot style={style} />,
  [PAGES.REACT_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
  [PAGES.ANGULAR_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
  [PAGES.VUE_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
};

export const getScreenShot = (internalName: string, style?: string) => {
  if (SVG_SCREENSHOT_MAPPINGS[internalName] !== undefined) {
    return SVG_SCREENSHOT_MAPPINGS[internalName](style || "");
  }
};
