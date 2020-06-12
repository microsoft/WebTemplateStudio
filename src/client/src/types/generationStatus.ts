export const GENERATION_NAMES = {
  TEMPLATES: "templates",
  APP_SERVICE: "appService",
  COSMOS_DB: "cosmosDB",
};

export enum GenerationItemStatus {
  Stopped = "Stopped",
  Generating = "Generating",
  Failed = "Failed",
  Success = "Success"
}

export interface GenerationItemData {
  name: string;
  title: string;
  status: GenerationItemStatus;
  link?: string;
}