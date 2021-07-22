import { expect } from 'chai';
import { Router } from './index';

describe('Router test', () => {
  it('Locations callbacks runs', () => {
    const history = [];
    Router
      .use('/#1', () => history.push('1'))
      .use('/#2', () => history.push('2'));
    window.location.href = '/#1';
    Router.start();
    expect(history[0] === '1').to.be.true;
    window.history.pushState('', '', '/#2');
    Router.start();
    expect(history[1] === '2').to.be.true;
  });
  it('Router go to location', () => {
    const history = [];
    Router
      .use('/#3', () => history.push('3'))
      .go('/#3');
    expect(window.location.hash === '#3').to.be.true;
    expect(history.length).to.be.equal(1);
  });
  it('Router remove location', () => {
    Router
      .remove('/#1')
      .remove('/#2')
      .remove('/#3');
    expect(Router.routes.size).to.be.equal(0);
  });
  it('Router catch error on undefined location', () => {
    const errors = [];
    const path = '/undefined-location';
    Router
      .catch((error) => {
        errors.push(error);
      })
      .go(path, () => {
        errors.push('этот callback не сработает');
      });
    expect(errors.length).to.be.equal(1);
    expect(window.location.pathname !== path).to.be.true;
  });
});
