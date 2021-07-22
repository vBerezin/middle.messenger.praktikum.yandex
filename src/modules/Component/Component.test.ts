import pug from 'pug';
import { expect } from 'chai';
import { Component } from './index';

const initialProps = {
  text: 'initial text',
};
const newState = {
  text: 'updated text',
};
const template = pug.compile('<div>#{data.text}</div>');
class Block extends Component<{
  text: string
}> {
  constructor(props) {
    super({ props, template });
  }
}
const block = new Block(initialProps);

describe('Component test', () => {
  it('create test block', () => {
    expect(block.el, 'block.el is div').be.a('HTMLDivElement');
  });
  it('block initial state equals to props', () => {
    expect(block.state).to.deep.equal(initialProps);
  });
  it('block props render', () => {
    expect(block.el.textContent).to.equal(initialProps.text);
  });
  it('block state update', () => {
    block.setState(newState);
    expect(block.state).to.deep.equal(newState);
  });
  it('block rerender', () => {
    expect(block.el.textContent).to.equal(newState.text);
  });
  it('block mount', () => {
    const container = window.document.body;
    block.mount(container);
    expect(block.el.parentNode === container).to.be.true;
  });
  it('block unmount', () => {
    block.unmount();
    expect(block.el.parentNode === null).to.be.true;
  });
});
