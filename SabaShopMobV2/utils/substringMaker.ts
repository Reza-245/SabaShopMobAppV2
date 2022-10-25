export function substringMaker(data: string, number: number): string {
  if (data.length > number) data = data.substring(0, number) + '...';
  return data;
}
