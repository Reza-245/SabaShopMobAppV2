export const FPList = {
  name: 'FPList',
  properties: {
    _id: 'int',
    pid: 'int',
  },
  primaryKey: '_id',
};

export const ProductCover = {
  name: 'ProductCover',
  properties: {
    _id: 'int',
    productId: 'int',
    orderCounts: 'int',
  },
};

export const Shop = {
  name: 'Shop',
  properties: {
    _id: 'int',
    orderedProducts: 'ProductCover[]',
  },
  primaryKey: '_id',
};
