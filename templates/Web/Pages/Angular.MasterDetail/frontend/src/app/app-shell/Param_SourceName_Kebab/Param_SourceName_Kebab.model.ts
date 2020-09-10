export interface ISampleOrder {
  title: string;
  id: number;
  status: string;
  orderDate: string;
  shipTo: string;
  orderTotal: number;
  shortDescription: string;
  longDescription: string;
  imageSrc?: string;
}
