import { IMetadata } from "../../types/metadata";
import { IOption } from "../../types/option";
import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";

export interface IProjectTypesActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS;
  payload: IOption[];
}

export const getProjectTypesAction = (projectTypeOption: IOption[]) => {
  return getProjectTypesSuccess(
    getOptionalFromMetadata(getMetadataFromJson(projectTypeOption))
  );
};

const getProjectTypesSuccess = (items: IOption[]): IProjectTypesActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS,
  payload: items
});

function getMetadataFromJson(items: any[]): IMetadata[] {
  return items.map<IMetadata>(val => ({
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
  }));
}

function getOptionalFromMetadata(items: IMetadata[]): IOption[] {
  return items.map<IOption>(val => ({
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    position: val.position,
    selected: val.selected,
    svgUrl: "",
    title: val.displayName
  }));
}
