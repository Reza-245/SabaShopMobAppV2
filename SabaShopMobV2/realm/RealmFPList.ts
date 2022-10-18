import axios from 'axios';
import Realm from 'realm';
import {FPList, ProductCover, Shop} from './Models';

import endpoints from '../utils/endpoints.json';
type TFavorite = {
  _id: number;
  pid: number;
};
export async function favoriteAction(
  action: string,
  dataSetter: any,
  id: number = 0,
  loader: any = () => {},
  schema: string = 'favorite',
) {
  let realm = new Realm({
    schema: [FPList, Shop, ProductCover],
    path: 'SabaShopV2DB',
  });

  switch (action) {
    case 'sync':
      let favorites: any = realm.objects<TFavorite>('FPList');
      let favoriteIds: number[] = [];
      for (let fav of favorites) favoriteIds.push(fav.pid);
      dataSetter(favoriteIds);
      loader(false);
      await realm.close();
      return await favoriteIds;
    case 'delete':
      await realm.write(() => {
        realm.delete(realm.objectForPrimaryKey<TFavorite>('FPList', id));
        let favorites: any = realm.objects<TFavorite>('FPList');
        let favoriteIds: number[] = [];
        for (let fav of favorites) favoriteIds.push(fav.pid);
        dataSetter(favoriteIds);
        loader(false);
      });
      break;
    case 'create':
      await realm.write(() => {
        realm.create<TFavorite>('FPList', {_id: id, pid: id});
        let favorites: any = realm.objects<TFavorite>('FPList');
        let favoriteIds: number[] = [];
        for (let fav of favorites) favoriteIds.push(fav.pid);
        dataSetter(favoriteIds);
        loader(false);
      });
      break;
  }

  await realm.close();
}
