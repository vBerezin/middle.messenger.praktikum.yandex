import { isObject } from '~common/scripts/utils/isObject';

export function isEqual(object1: Object, object2: Object) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    if (isObject(val1) && isObject(val2)) {
      if (!isEqual(val1, val2)) {
        return false;
      }
    } else if (!Object.is(object1[key], object2[key])) {
      return false;
    }
  }
  return true;
}
