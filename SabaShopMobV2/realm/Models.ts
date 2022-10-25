export const FPListSchema = {
  name: 'FPListSchema',
  properties: {
    _id: 'int',
    pid: 'int',
  },
  primaryKey: '_id',
};
export const ProductCoverSchema = {
  name: 'ProductCoverSchema',
  properties: {
    _id: 'int',
    productId: 'int',
    orderCounts: 'int',
  },
  primaryKey: '_id',
};
