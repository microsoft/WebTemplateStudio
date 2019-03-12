import blankpage from "../assets/blankpage.svg";
import EngineAPIService from "../services/EngineAPIService";
import getSvgUrl from "../utils/getSvgUrl";
import { IMetadata } from "../types/metadata";
import { IOption } from "../types/option";

type FrameworkType = "frontend" | "backend";

// thunk
export const getFrameworks = async (
  projectType: string,
  type: FrameworkType
): Promise<IOption[]> => {
  const api = new EngineAPIService("5000", undefined);
  try {
    const frameworksJson = await api.getFrameworks(projectType);

    if (frameworksJson.detail == null) {
      return getOptionalFromMetadata(getMetadataFromJson(frameworksJson, type));
    } else {
      console.log("FAILED");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

function getMetadataFromJson(items: any[], type: FrameworkType): IMetadata[] {
  return items
    .map<IMetadata>(val => ({
      name: val.name,
      displayName: val.displayName,
      summary: val.summary,
      longDescription: val.description,
      position: val.order,
      licenses: val.licenses,
      svgUrl: val.icon,
      tags: val.tags,
      selected: false
    }))
    .filter((val: IMetadata) => {
      return val.tags.type === type;
    });
}

function getOptionalFromMetadata(items: IMetadata[]): IOption[] {
  return items.map<IOption>(val => ({
    title: val.displayName,
    internalName: val.name,
    body: val.summary,
    svgUrl: getSvgUrl(val.name),
    selected: val.selected
  }));
}
