export interface IOption {
  title: string;
  internalName: string;
  originalTitle?: string;
  body: string;
  svgUrl: string | undefined;
  selected?: boolean;
}
