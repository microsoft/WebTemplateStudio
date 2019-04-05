export interface IOption {
  title: string;
  internalName: string;
  defaultName?: string;
  body: string;
  longDescription?: string;
  position?: number;
  svgUrl: string | undefined;
  licenses?: string[];
  selected?: boolean;
  author?: string;
  version?: string;
  unselectable?: boolean;
  isValidTitle?: boolean;
}
