import { IMetadata } from "../types/metadata";
import { IOption } from "../types/option";
import { FRAMEWORK_TYPE } from "./constants";

export const parseFrameworksPayload = (
  frameworksJson: any[],
  type: FRAMEWORK_TYPE,
  isPreview: boolean
): IOption[] => {
  return getOptionalFromMetadata(
    getMetadataFromJson(frameworksJson, type, isPreview)
  );
};

function getMetadataFromJson(
  items: any[],
  type: FRAMEWORK_TYPE,
  isPreview: boolean
): IMetadata[] {
  return items
    .map<IMetadata>(val => ({
      author: val.author,
      displayName: val.displayName,
      licenses: val.licenses,
      longDescription: val.description,
      name: val.name,
      position: val.order,
      selected: false,
      summary: val.summary,
      svgUrl: val.icon,
      tags: val.tags
    }))
    .filter((val: IMetadata) => {
      return val.tags.type === type && (isPreview || !val.tags.preview);
    });
}

function getOptionalFromMetadata(items: IMetadata[]): IOption[] {
  return items.map<IOption>(val => ({
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
    latestVersion: val.tags!.latestVersion,
    checkVersionPackageName: val.tags!.checkVersionPackageName,
    checkVersionPackageSource: val.tags!.checkVersionPackageSource,
  }));
}
