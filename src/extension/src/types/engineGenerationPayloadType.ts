import { IEngineGenerationTemplateType } from "./engineGenerationTemplateType";

export interface IEngineGenerationPayloadType {
  backendFramework: string;
  frontendFramework: string;
  pages: IEngineGenerationTemplateType;
  genPath: string;
  projectName: string;
  language: "Any";
  platform: string;
  homeName: "Test";
  projectType: string;
  features: IEngineGenerationTemplateType;
}
