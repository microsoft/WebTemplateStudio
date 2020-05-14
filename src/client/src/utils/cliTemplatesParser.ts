import { IApiTemplateInfo } from "../types/apiTemplateInfo";
import { IOption } from "../types/option";
import { FRAMEWORK_TYPE } from "./constants";

export const getFrameworksOptions = (json: any[], type: FRAMEWORK_TYPE, isPreview: boolean): IOption[] => {
  const items = getFrameworksTemplateInfo(json, type, isPreview);
  return items.map<IOption>((val) => ({
    author: val.author,
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    position: val.position,
    selected: val.selected,
    svgUrl: "",
    title: val.displayName,
    version: val.tags!.version,
    linuxVersion: val.tags!.linuxVersion,
    latestVersion: val.tags!.latestVersion,
    checkVersionPackageName: val.tags!.checkVersionPackageName,
    checkVersionPackageSource: val.tags!.checkVersionPackageSource,
  }));
};

export const getPagesOptions = (json: any[]): IOption[] => {
  const items = getPagesTemplateInfo(json);
  return items.map<IOption>((val) => ({
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    selected: val.selected,
    svgUrl: "",
    title: val.displayName,
    defaultName: val.defaultName,
    isValidTitle: true,
    author: val.author,
  }));
};

export const getFeaturesOptions = (json: any[]): IOption[] => {
  const items = getFeaturesTemplateInfo(json);
  const stored = items.reduce((result, val) => {
    if(!result.some(option => option.templateGroupIdentity === val.templateGroupIdentity)) {
      const option: IOption = {
        body: val.summary,
        internalName: val.name,
        templateGroupIdentity: val.templateGroupIdentity,
        licenses: val.licenses,
        longDescription: val.longDescription,
        selected: val.selected,
        svgUrl: "",
        title: val.displayName,
        defaultName: val.defaultName,
        isValidTitle: true,
        author: val.author,
        group: val.group,
      }
      result.push(option);
    }    
    return result;
  }, [] as IOption[]);



  return stored;
};

const getFrameworksTemplateInfo = (items: any[], type: FRAMEWORK_TYPE, isPreview: boolean): IApiTemplateInfo[] => {
  return items
    .map<IApiTemplateInfo>((val) => ({
      author: val.author,
      templateGroupIdentity: val.templateGroupIdentity,
      defaultName: val.defaultName,
      displayName: val.displayName,
      licenses: val.licenses,
      longDescription: val.description,
      name: val.name,
      position: val.order,
      selected: false,
      summary: val.summary,
      svgUrl: val.icon,
      tags: val.tags,
    }))
    .filter((val: IApiTemplateInfo) => {
      return val.tags.type === type && (isPreview || !val.tags.preview);
    });
};

const getPagesTemplateInfo = (items: any[]): IApiTemplateInfo[] => {
  return getTemplateInfo(items).sort((a: IApiTemplateInfo, b: IApiTemplateInfo) => a.position - b.position);
};

const getFeaturesTemplateInfo = (items: any[]): IApiTemplateInfo[] => {
  return getTemplateInfo(items).sort((a: IApiTemplateInfo, b: IApiTemplateInfo) => a.position - b.position);
};

const getTemplateInfo = (items: any[]): IApiTemplateInfo[] => {
  return items.map<IApiTemplateInfo>((val) => ({
    displayName: val.name,
    licenses: val.licenses,
    longDescription: val.richDescription,
    name: val.templateId,
    templateGroupIdentity: val.templateGroupIdentity,
    position: val.displayOrder,
    selected: false,
    summary: val.description,
    svgUrl: val.icon,
    tags: val.tags,
    defaultName: val.defaultName,
    author: val.author,
    group: val.group,
  }));
};
