import pug from 'pug';
import { expect } from 'chai';
import { Templator } from './index';

describe('Templator test', () => {
  it('Templator.compile should return Element', () => {
    const compiler = pug.compile('div');
    const templator = new Templator({ compiler });
    expect(templator.compile(), 'if 1 children in template').to.be.a('HTMLDivElement');
  });
  it('Templator.compile should return Error', () => {
    const compiler = pug.compile('<div>1</div><div>2</div>');
    const templator = new Templator({ compiler });
    expect(templator.compile, 'if 2 children in template').to.throw();
  });
});
