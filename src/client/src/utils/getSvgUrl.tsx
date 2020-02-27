import * as React from "react";
import classnames from "classnames";

import { ReactComponent as FullStack } from "../assets/fullstack.svg";
import { ReactComponent as MasterDetail } from "../assets/masterdetail.svg";
import { ReactComponent as BlankPage } from "../assets/blankpage.svg";
import { ReactComponent as ContentGrid } from "../assets/contentgrid.svg";
import { ReactComponent as List } from "../assets/list.svg";

import svgStyles from "./svgStyles.module.css";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants";
import { ReactComponent as ReactIcon } from "../assets/react.svg";
import { ReactComponent as AngularIcon } from "../assets/angular.svg";
import { ReactComponent as VueIcon } from "../assets/vue.svg";
import { ReactComponent as NodeIcon } from "../assets/node.svg";
import { ReactComponent as MoleculerIcon } from "../assets/moleculer.svg";
import { ReactComponent as FlaskIcon } from "../assets/flask.svg";
import { ReactComponent as AzureIcon } from "../assets/azure.svg";
import { ReactComponent as AppserviceIcon } from "../assets/appservice.svg";
import { ReactComponent as AzurefunctionsIcon } from "../assets/azurefunctions.svg";

import { ReactComponent as CosmosdbIcon } from "../assets/cosmosdb.svg";
import warning from "../assets/warning.svg";
import cancel from "../assets/cancel.svg";
import greencheck from "../assets/checkgreen.svg";

import { ReactComponent as Masterdetailscreenshot }  from "../assets/masterdetailscreenshot.svg";
import { ReactComponent as Listscreenshot } from "../assets/listscreenshot.svg";
import { ReactComponent as Gridscreenshot }  from "../assets/gridscreenshot.svg";
import { ReactComponent as Blankscreenshot } from "../assets/blankscreenshot.svg";

const SVG_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT]: (style: string) => (
    <ReactIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR]: (style: string) => (
    <AngularIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE]: (style: string) => (
    <VueIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE]: (style: string) => (
    <NodeIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER]: (style: string) => (
    <MoleculerIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK]: (style: string) => (
    <FlaskIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: (style: string) => (
    <AppserviceIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: (style: string) => (
    <AzurefunctionsIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE]: (style: string) => (
    <AzureIcon className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: (style: string) => (
    <CosmosdbIcon className={classnames(style)}/>
  )
};

const SVG_REACTCOMPONENT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP]: (style: string) => (
    <FullStack className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <MasterDetail className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <BlankPage className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <ContentGrid className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <List className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <MasterDetail className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <BlankPage className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <ContentGrid className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <List className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <MasterDetail className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <BlankPage className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <ContentGrid className={classnames(style, svgStyles.icon)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <List className={classnames(style, svgStyles.icon)} />
  )
};

const SVG_SCREENSHOT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot className={classnames(style)} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot  className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <Listscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <Listscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <Listscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot className={classnames(style)}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot className={classnames(style)}/>
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
