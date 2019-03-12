export interface IOption {
  title: string;
  internalName: string;
  originalTitle?: string;
  body: string;
  longDescription?: string;
  position?: number;
  svgUrl: string | undefined;
  licenses?: string[];
  selected?: boolean;
  unselectable?: boolean;
}
