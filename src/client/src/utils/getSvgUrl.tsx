import * as React from "react";
import loadable from '@loadable/component'
import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants/constants";

import warning from "../assets/warning.svg";
import cancel from "../assets/cancel.svg";
import greencheck from "../assets/checkgreen.svg";

const FullStack = loadable(() => import(/* webpackChunkName: "FullStack" */  "./svgComponents/FullStack"));
const MasterDetail = loadable(() => import(/* webpackChunkName: "MasterDetail" */  "./svgComponents/MasterDetail"));
const BlankPage = loadable(() => import(/* webpackChunkName: "BlankPage" */  "./svgComponents/BlankPage"));
const ContentGrid = loadable(() => import(/* webpackChunkName: "ContentGrid" */  "./svgComponents/ContentGrid"));
const Masterdetailscreenshot = loadable(() => import(/* webpackChunkName: "Masterdetailscreenshot" */  "./svgComponents/Masterdetailscreenshot"));
const Listscreenshot = loadable(() => import(/* webpackChunkName: "Listscreenshot" */  "./svgComponents/Listscreenshot"));
const Gridscreenshot = loadable(() => import(/* webpackChunkName: "Gridscreenshot" */  "./svgComponents/Gridscreenshot"));
const Blankscreenshot = loadable(() => import(/* webpackChunkName: "Blankscreenshot" */  "./svgComponents/Blankscreenshot"));
const List = loadable(() => import(/* webpackChunkName: "List" */  "./svgComponents/List"));
//icons
const ReactIcon = loadable(() => import(/* webpackChunkName: "ReactIcon" */  "./svgComponents/ReactIcon"));
const AngularIcon = loadable(() => import(/* webpackChunkName: "AngularIcon" */  "./svgComponents/AngularIcon"));
const VueIcon = loadable(() => import(/* webpackChunkName: "VueIcon" */  "./svgComponents/VueIcon"));
const NodeIcon = loadable(() => import(/* webpackChunkName: "NodeIcon" */  "./svgComponents/NodeIcon"));
const FlaskIcon = loadable(() => import(/* webpackChunkName: "FlaskIcon" */  "./svgComponents/FlaskIcon"));
const MoleculerIcon = loadable(() => import(/* webpackChunkName: "MoleculerIcon" */  "./svgComponents/MoleculerIcon"));
const AspNetIcon = loadable(() => import(/* webpackChunkName: "AspNetIcon" */  "./svgComponents/AspNetIcon"));
const AzureIcon = loadable(() => import(/* webpackChunkName: "AzureIcon" */  "./svgComponents/AzureIcon"));
const AppserviceIcon = loadable(() => import(/* webpackChunkName: "AppServiceIcon" */  "./svgComponents/AppserviceIcon"));
const CosmosdbIcon = loadable(() => import(/* webpackChunkName: "CosmosdbIcon" */  "./svgComponents/CosmosdbIcon"));

const SVG_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT]: (style: string) => (
    <ReactIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR]: (style: string) => (
    <AngularIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE]: (style: string) => (
    <VueIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE]: (style: string) => (
    <NodeIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER]: (style: string) => (
    <MoleculerIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ASPNET]: (style: string) => (
    <AspNetIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK]: (style: string) => (
    <FlaskIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: (style: string) => (
    <AppserviceIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE]: (style: string) => (
    <AzureIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: (style: string) => (
    <CosmosdbIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO]: (style: string) => (
    <CosmosdbIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL]: (style: string) => (
    <CosmosdbIcon style={style}/>
  )
};

const SVG_REACTCOMPONENT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP]: (style: string) => (
    <FullStack style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <List style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <List style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <List style={style} />
  )
};

const SVG_SCREENSHOT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  )
};

export const withLocalPath = (absolutePath: string): string => {
  return process.env.REACT_APP_RELATIVE_PATH + absolutePath;
};

export const getScreenShot = (internalName: string, style?: string) => {
  if (SVG_SCREENSHOT_MAPPINGS[internalName] !== undefined) {
    return SVG_SCREENSHOT_MAPPINGS[internalName](style || "");
  }
};

export const getSvg = (internalName: string, style?: string) => {
  if (SVG_REACTCOMPONENT_MAPPINGS[internalName]) {
    return SVG_REACTCOMPONENT_MAPPINGS[internalName](style || "");
  }
  if (SVG_MAPPINGS[internalName]) {
    return SVG_MAPPINGS[internalName](style || "");
  }
};

export const getCancelSvg = (): string => withLocalPath(cancel);
export const getWarningSvg = (): string => withLocalPath(warning);
export const getGreenCheckSvg = (): string => withLocalPath(greencheck);
