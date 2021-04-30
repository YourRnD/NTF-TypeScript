export const getKeyValue = <U extends keyof T, T extends object>(
  key: U
): Function => (obj: T) => obj[key];
