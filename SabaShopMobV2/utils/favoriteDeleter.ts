import {ActionFPList} from '../realm/ActionFPList';
export async function favDeleter(
  favorites: number[] | undefined,
  setFavorites: (favoriteList: number[]) => void,
  productId: number,
) {
  if (favorites && favorites.includes(productId))
    ActionFPList('delete', productId);
  else ActionFPList('create', productId);
  ActionFPList('sync', 0, setFavorites);
}
