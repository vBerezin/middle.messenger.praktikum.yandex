export function isObject(object: Object): boolean {
  return object !== null && object !== undefined && object.constructor === Object;
}
