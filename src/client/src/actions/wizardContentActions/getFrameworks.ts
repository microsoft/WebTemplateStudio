import EngineAPIService from "../../services/EngineAPIService";
import getSvgUrl from "../../utils/getSvgUrl";
import { IMetadata } from "../../types/metadata";
import { IOption } from "../../types/option";

type FrameworkType = "frontend" | "backend";

// thunk
export const getFrameworks = async (
  projectType: string,
  type: FrameworkType,
  isPreview: boolean,
  serverPort: number
): Promise<IOption[]> => {
  const api = new EngineAPIService(serverPort, undefined);
  try {
    const frameworksJson = await api.getFrameworks(projectType);

    if (frameworksJson.detail == null) {
      return getOptionalFromMetadata(
        getMetadataFromJson(frameworksJson, type, isPreview)
      );
    } else {
      console.log("FAILED");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

function getMetadataFromJson(
  items: any[],
  type: FrameworkType,
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
    svgUrl: getSvgUrl(val.name),
    title: val.displayName,
    version: val.tags!.version
  }));
}
