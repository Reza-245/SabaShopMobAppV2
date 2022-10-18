import axios from 'axios';
import Realm from 'realm';
import {FPList, ProductCover, Shop} from './Models';
import endpoints from '../utils/endpoints.json';
import {isEmpty} from 'lodash';

type TShop = {
  _id: number;
  orderedProducts: TProductCover[];
};
type TProductCover = {
  _id: number;
  productId: number;
  orderCounts: number;
};

export async function shopAction(
  action: string = '',
  dataSetter: any = () => {},
  objectData: TProductCover | any = '',
  hasOrdered: any = () => {},
  IsdataSetterTypeShop: boolean = true,
) {
  let realm = await new Realm({
    schema: [FPList, Shop, ProductCover],
    path: 'SabaShopV2DB',
  });

  switch (action) {
    case 'sync':
      const shop: TShop = await realm.objects<TShop>('Shop')[0];

      if (shop) {
        hasOrdered(shop.orderedProducts);
        const shopWhole: TShop[] = await realm.objects<TShop[]>('Shop');
        if (IsdataSetterTypeShop) dataSetter(shopWhole);
        else dataSetter(shop?.orderedProducts?.length);
      }
      break;
    case 'delete':
      await realm.write(() => {
        const shop: TShop = realm.objects<TShop>('Shop')[0];
        const proCovers: TProductCover[] = shop.orderedProducts;
        const updated_pros = proCovers.filter(
          pro => pro.productId != objectData,
        );
        hasOrdered(updated_pros);
        if (!updated_pros.length) realm.deleteAll();
        else {
          shop.orderedProducts = updated_pros;
          dataSetter(shop);
        }
      });
      break;

    case 'create':
      const shopData = await realm.write(async () => {
        const shop: TShop = realm.objects<TShop>('Shop')[0];
        if (!shop) {
          const created_productCover = realm.create<TProductCover>(
            'ProductCover',
            {
              _id: objectData._id,
              productId: objectData.productId,
              orderCounts: objectData.orderCounts,
            },
          );
          realm.create('Shop', {
            _id: 1,
            orderedProducts: [created_productCover],
          });
          dataSetter(shop);

          return shop;
        } else {
          const proCovers = shop.orderedProducts;
          const isEdit = proCovers.find(
            pro => pro.productId == objectData.productId,
          );

          if (isEdit) {
            const proCoverIndex = proCovers.findIndex(
              pro => pro.productId == objectData.productId,
            );
            proCovers[proCoverIndex] = objectData;
          } else {
            const created_productCover = realm.create<TProductCover>(
              'ProductCover',
              {
                _id: objectData._id,
                productId: objectData.productId,
                orderCounts: objectData.orderCounts,
              },
            );
            shop.orderedProducts.push(created_productCover);
          }
          dataSetter(shop);

          return shop;
        }
      });
      return shopData;
  }
  await realm.close();
}
