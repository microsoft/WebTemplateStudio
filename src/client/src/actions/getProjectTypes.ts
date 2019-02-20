import projectTypes from "../reducers/wizardContent/projectTypeReducer";
import EngineAPIService from "../services/EngineAPIService";
import { IMetadata } from "../types/metadata";
import { IOption } from "../types/option";
import { getProjectTypesSuccess } from "./getProjectTypesSuccess";

// thunk
export const getProjectTypesAction = () => {
  return async (dispatch: any) => {
    const api = new EngineAPIService("5000", undefined);

    try {
      const projectTypesJson = await api.getProjectTypes();
      if (projectTypesJson.value.items !== null) {
        dispatch(
          getProjectTypesSuccess(
            getOptionalFromMetadata(getMetadataFromJson(projectTypesJson))
          )
        );
      } else {
        // dispatch message here.
      }
    } catch (error) {
      // dispatch message here.
    }
  };
};

function getMetadataFromJson(items: any[]): IMetadata[] {
  return items.map<IMetadata>(val => ({
    name: val.name,
    displayName: val.displayName,
    summary: val.summary,
    longDescription: val.description,
    position: val.order,
    licenses: val.licenses,
    svgUrl: val.icon,
    selected: false
  }));
}

function getOptionalFromMetadata(items: IMetadata[]): IOption[] {
  return items.map<IOption>(val => ({
    title: val.name,
    body: val.summary,
    svgUrl: val.svgUrl,
    selected: val.selected
  }));
}
