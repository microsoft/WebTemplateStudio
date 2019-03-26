import * as Actions from "./types";
import EngineAPIService from "../services/EngineAPIService";
import { IApiTemplateInfo } from "../types/apiTemplateInfo";
import { IOption } from "../types/option";
import getSvgUrl from "../utils/getSvgUrl";

const getPagesOptionsAction = (
  projectType: string,
  frontendFramework: string,
  backendFramework: string
) => {
  return async (dispatch: any) => {
    const port = "5000";
    const api = new EngineAPIService(port, undefined);

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

const getPagesOptionsSuccess = (pagesOptions: IOption[]) => ({
  payload: pagesOptions,
  type: Actions.GET_PAGES_OPTIONS_SUCCESS
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
    defaultName: val.defaultName
  }));
}

function getOptionalFromApiTemplateInfo(items: IApiTemplateInfo[]): IOption[] {
  return items.map<IOption>(val => ({
    body: val.summary,
    internalName: val.name,
    selected: val.selected,
    svgUrl: getSvgUrl(val.name),
    title: val.displayName,
    defaultName: val.defaultName,
    isValidTitle: true
  }));
}

export { getPagesOptionsAction, getPagesOptionsSuccess };
