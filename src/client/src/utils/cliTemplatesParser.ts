import { IApiTemplateInfo } from "../types/apiTemplateInfo";
import { IOption } from "../types/option";
import { FRAMEWORK_TYPE } from "./constants/constants";

export const getFrameworksOptions = (json: any[], type: FRAMEWORK_TYPE): IOption[] => {
  const items = getFrameworksTemplateInfo(json, type);
  return items.map<IOption>((val) => ({
    author: val.author,
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    position: val.position,
    selected: val.selected,
    icon: val.icon,
    title: val.displayName,
    version: val.tags!.version,
    linuxVersion: val.tags!.linuxVersion,
    latestVersion: val.tags!.latestVersion,
    checkVersionPackage: {
      source: (val.tags!.checkVersionPackage as string).split("|")[0],
      name: (val.tags!.checkVersionPackage as string).split("|")[1],
    },
    requirement: {
      name: (val.tags!.requirements as string).split("|")[0],
      version: (val.tags!.requirements as string).split("|")[1],
      isInstalled: val.tags!.isRequirementInstalled
    },
    isPreview: val.tags.preview,
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
    icon: val.icon,
    title: val.displayName,
    defaultName: val.defaultName,
    isValidTitle: true,
    author: val.author,
    editable: val.itemNameEditable,
  }));
};

export const getFeaturesOptions = (json: any[]): IOption[] => {
  const items = getFeaturesTemplateInfo(json);
  const stored = items.reduce((result, val) => {
    if (!result.some((option) => option.templateGroupIdentity === val.templateGroupIdentity)) {
      const option: IOption = {
        body: val.summary,
        //internalName: val.name,
        internalName: val.templateGroupIdentity,
        templateGroupIdentity: val.templateGroupIdentity,
        licenses: val.licenses,
        longDescription: val.longDescription,
        selected: val.selected,
        icon: val.icon,
        title: val.displayName,
        defaultName: val.defaultName,
        isValidTitle: true,
        author: val.author,
        group: val.group,
        editable: val.itemNameEditable,
      };
      result.push(option);
    }
    return result;
  }, [] as IOption[]);

  return stored;
};

const getFrameworksTemplateInfo = (items: any[], type: FRAMEWORK_TYPE): IApiTemplateInfo[] => {
  return items
    .filter((val) => val.tags.type === type)
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
      icon: val.icon,
      tags: val.tags,
    }));
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
    icon: val.icon,
    tags: val.tags,
    defaultName: val.defaultName,
    author: val.author,
    group: val.group,
    itemNameEditable: val.itemNameEditable,
  }));
};
