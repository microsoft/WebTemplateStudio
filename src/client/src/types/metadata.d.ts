export interface IMetadata {
  name: string;
  displayName: string;
  summary: string;
  longDescription: string;
  position: number;
  svgUrl: string | undefined;
  licenses: string[];
  selected: boolean;
  author: string;
  tags: any;
}
