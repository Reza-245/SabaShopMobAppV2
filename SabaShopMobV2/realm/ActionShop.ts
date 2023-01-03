import Realm from 'realm';
import {ProductCoverSchema} from './Models';
import {TProductCover} from '../utils/types';
export function ActionShop(
  type: string,
  id: number = 0,
  data: number = 0,
  dataSetter: ((productsCover: TProductCover[]) => void) | null = null,
  hasOrdered: ((productsCover: TProductCover[]) => void) | null = null,
  productsLength: ((productsOrderedLength: number) => void) | null = null,
  allTypeInstedId: boolean = false,
) {
  try {
    const realm = new Realm({
      path: 'SabaShopV2DB',
      schema: [ProductCoverSchema],
    });
    switch (type) {
      case 'sync':
        const productCovers: TProductCover[] | any =
          realm.objects<TProductCover[]>('ProductCoverSchema');
        if (productCovers && dataSetter) dataSetter(productCovers);
        if (productsLength) productsLength(productCovers.length);
        if (hasOrdered) hasOrdered(productCovers);
        break;
      case 'delete':
        realm.write(() => {
          if (allTypeInstedId) {
            realm.delete(realm.objects('ProductCoverSchema'));
          } else {
            const product = realm.objectForPrimaryKey('ProductCoverSchema', id);
            if (product)
              realm.delete(realm.objectForPrimaryKey('ProductCoverSchema', id));
          }
        });
        break;
      case 'create_update':
        realm.write(() => {
          const productCover: TProductCover | undefined =
            realm.objectForPrimaryKey<TProductCover>('ProductCoverSchema', id);
          if (productCover) productCover.orderCounts = data;
          else
            realm.create<TProductCover>('ProductCoverSchema', {
              _id: id,
              productId: id,
              orderCounts: data,
            });
        });
        break;
    }
    // realm.close();
  } catch (error) {}
}
