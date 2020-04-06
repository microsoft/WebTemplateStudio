import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails, IPageOptionsActionType } from "./model";
import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../../typeKeys";
import { IOption } from "../../../types/option";
import { IApiTemplateInfo } from "../../../types/apiTemplateInfo";

const setVisitedWizardPageAction = (route: string): ISetVisitedPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});

const resetVisitedWizardPageAction = (): IResetVisitedPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE,
});

const setPageWizardPageAction = (route: string): ISetPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE,
  payload: route
});

const setDetailPageAction = (
  detailPageInfo: IOption,
  isIntlFormatted = false,
  originRoute: string
): ISetDetails => ({
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO,
  payload: {
    data: detailPageInfo,
    isIntlFormatted,
    originRoute
  }
});

const getPagesOptionsSuccessAction = (
  pagesOptions: IOption[]
): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS
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
  getPagesOptionsSuccessAction,
  setVisitedWizardPageAction,
  resetVisitedWizardPageAction,
  setPageWizardPageAction,
  setDetailPageAction
 };