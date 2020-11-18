import * as React from "react";
import loadable from "@loadable/component";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants/internalNames";

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
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => <Masterdetailscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => <Gridscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => <Listscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => <Listscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => <Listscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => <Blankscreenshot style={style} />,
};

export const getScreenShot = (internalName: string, style?: string) => {
  if (SVG_SCREENSHOT_MAPPINGS[internalName] !== undefined) {
    return SVG_SCREENSHOT_MAPPINGS[internalName](style || "");
  }
};
