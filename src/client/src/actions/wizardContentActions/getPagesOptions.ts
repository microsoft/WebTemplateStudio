import EngineAPIService from "../../services/EngineAPIService";
import { IApiTemplateInfo } from "../../types/apiTemplateInfo";
import { IOption } from "../../types/option";
import getSvgUrl from "../../utils/getSvgUrl";
import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import WizardContentActionType from "./wizardContentActionType";
import { Dispatch } from "react";

export interface IPageOptionsActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS;
  payload: IOption[];
}

const getPagesOptionsAction = (
  projectType: string,
  frontendFramework: string,
  backendFramework: string,
  serverPort: number
) => {
  return async (dispatch: Dispatch<WizardContentActionType>) => {
    const api = new EngineAPIService(serverPort, undefined);

    try {
      const pagesJson = await api.getPages(
        projectType,
        frontendFramework,
        backendFramework
      );

      if (pagesJson.detail == null) {
        dispatch(
          getPagesOptionsSuccess(
            getOptionalFromApiTemplateInfo(
              getApiTemplateInfoFromJson(pagesJson)
            )
          )
        );
      } else {
        console.log("FAILED");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const getPagesOptionsSuccess = (
  pagesOptions: IOption[]
): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS
});

function getApiTemplateInfoFromJson(items: any[]): IApiTemplateInfo[] {
  return items.map<IApiTemplateInfo>(val => ({
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
  }));
}

function getOptionalFromApiTemplateInfo(items: IApiTemplateInfo[]): IOption[] {
  return items.map<IOption>(val => ({
    body: val.summary,
    internalName: val.name,
    licenses: val.licenses,
    longDescription: val.longDescription,
    selected: val.selected,
    svgUrl: getSvgUrl(val.name),
    title: val.displayName,
    defaultName: val.defaultName,
    isValidTitle: true,
    author: val.author
  }));
}

export { getPagesOptionsAction, getPagesOptionsSuccess };
