import * as React from "react";
import classnames from "classnames";

import { ReactComponent as FullStack } from "../assets/fullstack.svg";
import { ReactComponent as MasterDetail } from "../assets/masterdetail.svg";
import { ReactComponent as BlankPage } from "../assets/blankpage.svg";
import { ReactComponent as ContentGrid } from "../assets/contentgrid.svg";
import { ReactComponent as List } from "../assets/list.svg";

import svgStyles from "./svgStyles.module.css";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants";
import react from "../assets/react.svg";
import angular from "../assets/angular.svg";
import node from "../assets/nodeJS.svg";
import azure from "../assets/azure.svg";
import azurefunctions from "../assets/azurefunctions.svg";
import cancel from "../assets/cancel.svg";
import cosmosdb from "../assets/cosmosdb.svg";

import masterdetailscreenshot from "../assets/masterdetailscreenshot.svg";
import listscreenshot from "../assets/listscreenshot.svg";
import gridscreenshot from "../assets/gridscreenshot.svg";
import blankscreenshot from "../assets/blankscreenshot.svg";

const SVG_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_JS]: react,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR]: angular,
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE_JS]: node,
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: azurefunctions,
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE]: azure,
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: cosmosdb
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
  )
};

const SVG_SCREENSHOT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: masterdetailscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: masterdetailscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: gridscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: gridscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: listscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: listscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: blankscreenshot,
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: blankscreenshot
};

export const withLocalPath = (absolutePath: string): string => {
  return process.env.REACT_APP_RELATIVE_PATH + absolutePath;
};

export const screenShotMapping = (internalName: string): string | undefined => {
  if (SVG_SCREENSHOT_MAPPINGS[internalName] !== undefined) {
    return withLocalPath(SVG_SCREENSHOT_MAPPINGS[internalName]);
  }
};

export const getSvg = (internalName: string, style?: string) => {
  if (SVG_REACTCOMPONENT_MAPPINGS[internalName]) {
    return SVG_REACTCOMPONENT_MAPPINGS[internalName](style || "");
  }
};

export default (internalName: string): string | undefined => {
  if (SVG_MAPPINGS[internalName] !== undefined) {
    return withLocalPath(SVG_MAPPINGS[internalName]);
  }
};

export const getCancelSvg = (): string => withLocalPath(cancel);
