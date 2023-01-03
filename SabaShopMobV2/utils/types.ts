export type TShop = {
  _id: number;
  orderedProducts: TProductCover[];
};
export type TProductCover = {
  _id: number;
  productId: number;
  orderCounts: number;
};

export type TProductServer = {
  id: number;
  nam: string;
  unit: string;
  unit2: string;
  numb: number;
  pic_path: string;
  price: number;
  price1: number;
  box: number;
};
