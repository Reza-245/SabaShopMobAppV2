export function MConverter(money: number) {
  return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
