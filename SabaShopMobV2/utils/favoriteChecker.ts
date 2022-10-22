export function favoriteChacker(
  favorites: number[] | undefined,
  productId: number,
) {
  if (favorites && favorites.includes(productId)) return 'heart';
  else return 'hearto';
}
