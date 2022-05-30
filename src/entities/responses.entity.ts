import { ApiResponse } from './response.entity';

function setNameProp<T, K extends keyof T>(item: T, keyname: K) {
  item[keyname] = { ...item[keyname], name: keyname };
  return item;
}

export function apiResponses<T extends Record<string, ApiResponse>>(arg: T): T {
  const items = Object.keys(arg).reduce(
    (acc, name) => setNameProp(acc, name),
    arg,
  );
  return items;
}
