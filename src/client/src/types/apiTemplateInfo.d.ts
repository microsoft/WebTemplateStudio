export interface IApiTemplateInfo {
  name: string;
  templateGroupIdentity: string;
  displayName: string;
  summary: string;
  longDescription: string;
  order: number;
  icon: string;
  licenses: string[];
  selected: boolean;
  tags: any;
  defaultName: string;
  author: string;
  group?: string;
  itemNameEditable?: boolean;
}
