import { expect } from 'chai';
import { isObject } from './isObject';

describe('utils', () => {
  it('isObject', () => {
    expect(isObject({}), '{}').to.be.true;
    expect(isObject(''), '""').to.be.false;
    expect(isObject([]), '[]').to.be.false;
  });
});
