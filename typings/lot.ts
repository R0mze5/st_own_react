export type LotId = number;

export interface Lot {
  id: LotId;
  name: string;
  description: string;
  price: number;
}
