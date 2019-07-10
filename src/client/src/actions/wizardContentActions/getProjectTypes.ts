import { IMetadata } from "../../types/metadata";
import { IOption } from "../../types/option";
import getSvgUrl from "../../utils/getSvgUrl";

function getMetadataFromJson(items: any[]): IMetadata[] {
  return items.map<IMetadata>(val => ({
    name: val.name,
    displayName: val.displayName,
    summary: val.summary,
    longDescription: val.description,
    position: val.order,
    licenses: val.licenses,
    svgUrl: val.icon,
    tags: val.tags,
    selected: false,
    author: val.author
  }));
}

function getOptionalFromMetadata(items: IMetadata[]): IOption[] {
  return items.map<IOption>(val => ({
    title: val.displayName,
    internalName: val.name,
    body: val.summary,
    longDescription: val.longDescription,
    position: val.position,
    svgUrl: getSvgUrl(val.name),
    selected: val.selected,
    licenses: val.licenses
  }));
}
