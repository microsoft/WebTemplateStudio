export interface IApiTemplateInfo {
  name: string;
  displayName: string;
  summary: string;
  longDescription: string;
  position: number;
  svgUrl: string | undefined;
  licenses: string[];
  selected: boolean;
  tags: any;
  defaultName: string;
  author: string;
}
