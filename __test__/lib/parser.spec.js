'use strict';

let parser = require('../../src/lib/parser.js');

describe('parser module', () => {

  it('requires an object', () => {
    let req = undefined;
    return parser(req)
      // .then(response => expect(response).toBeUndefined())
      .catch(err => expect(err).toBe('Invalid Request Object. Could not parse information.'));
  });

  it('requires an object that has a url property', () => {
    let req = {noturl: 'fake data'};
    return parser(req)
      // .then(response => false )
      .catch(err => expect(err).toBe('Invalid Request Object. Could not parse information.'));
  });

  it('returns an object if given object contains url property', () => {
    let req = { url: 'http://localhost'};
    return parser(req)
      .then(request => expect(typeof request.url).toEqual('object'));
    // .catch(err => false);
  });

  it('parser can handle multiple queries', () => {
    let req = { method:'GET', url: 'http://localhost?a=1&b=2' };
    return parser(req)
      .then( request => {
        expect(request.url.query.a).toEqual('1');
        expect(request.url.query.b).toEqual('2');
      })
      .catch( console.error );
  });


});
