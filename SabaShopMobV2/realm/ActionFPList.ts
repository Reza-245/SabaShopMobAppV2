import axios from 'axios';
import Realm from 'realm';
import {FPListSchema, ProductCoverSchema} from './Models';
import endpoints from '../utils/endpoints.json';
import {TShop, TProductCover, TFavorite} from '../utils/types';

export async function ActionFPList(
  actionType: string,
  id: number = 0,
  dataSetter: ((favorite: number[]) => void) | null = null,
) {
  try {
    const realm = new Realm({
      path: 'SabaShopV2DB',
      schema: [FPListSchema, ProductCoverSchema],
    });
    switch (actionType) {
      case 'sync':
        const favorites: TFavorite[] | any =
          realm.objects<TFavorite[]>('FPListSchema');
        let favoritesList: number[] = [];
        if (favorites) for (let fav of favorites) favoritesList.push(fav.pid);
        if (dataSetter) dataSetter(favoritesList);
        break;
      case 'delete':
        realm.write(() =>
          realm.delete(
            realm.objectForPrimaryKey<TFavorite>('FPListSchema', id),
          ),
        );
        break;
      case 'create':
        realm.write(() =>
          realm.create<TFavorite>('FPListSchema', {_id: id, pid: id}),
        );
        break;
    }

    // realm.close();
  } catch (error) {
    console.log(`error from FPList `, error);
  }
}
