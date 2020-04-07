import { IPageOptionsActionType } from "./model";
import { TEMPLATES_TYPEKEYS } from "../../typeKeys";
import { IOption } from "../../../types/option";
import { IApiTemplateInfo } from "../../../types/apiTemplateInfo";

const getPagesOptionsAction = (pagesOptions: IOption[]) => {
  return getPagesOptionsSuccessAction(
    getOptionalFromApiTemplateInfo(getApiTemplateInfoFromJson(pagesOptions))
  );
};

const getPagesOptionsSuccessAction = (
  pagesOptions: IOption[]
): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: TEMPLATES_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS
});

function getApiTemplateInfoFromJson(items: any[]): IApiTemplateInfo[] {
  const listItems = items.map<IApiTemplateInfo>(val => ({
    displayName: val.name,
    licenses: val.licenses,
    longDescription: val.richDescription,
    name: val.templateId,
    position: val.displayOrder,
    selected: false,
    summary: val.description,
    svgUrl: val.icon,
    tags: val.tags,
    defaultName: val.defaultName,
    author: val.author
  })).sort((a: IApiTemplateInfo, b: IApiTemplateInfo) => a.position - b.position);

  return listItems;
}

function getOptionalFromApiTemplateInfo(items: IApiTemplateInfo[]): IOption[] {
  return items.map<IOption>(val => ({
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    selected: val.selected,
    svgUrl: "",
    title: val.displayName,
    defaultName: val.defaultName,
    isValidTitle: true,
    author: val.author
  }));
}

export {
  getPagesOptionsAction,
  getPagesOptionsSuccessAction
 };