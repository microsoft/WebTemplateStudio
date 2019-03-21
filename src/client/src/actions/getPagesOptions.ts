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
    longDescription: val.description,
    name: val.identity,
    position: val.precedence,
    selected: false,
    summary: val.description,
    svgUrl: val.icon,
    tags: val.tags
  }));
}

function getOptionalFromApiTemplateInfo(items: IApiTemplateInfo[]): IOption[] {
  return items.map<IOption>(val => ({
    body: val.summary,
    internalName: val.name,
    selected: val.selected,
    svgUrl: getSvgUrl(val.name),
    title: val.displayName
  }));
}

export { getPagesOptionsAction, getPagesOptionsSuccess };
