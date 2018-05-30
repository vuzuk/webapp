export function stringifyDate(date) {
  return new Date(date).toString().substring(4, 15);
}