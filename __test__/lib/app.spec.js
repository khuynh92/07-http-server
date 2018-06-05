
'use strict';

const superagent = require('superagent');
const app = require('../../src/app.js');


describe ('app module', () => {

  beforeAll( () => {
    app.start(3000);
  });

  afterAll( () => {
    app.stop();
  });

  it('if path does not exist send a 404', () => {

    return superagent.get('http://localhost:3000/fake')
      .catch(response => {
        expect(response.status).toEqual(404);
      });

  });

  it('sends 200 for a valid request', () => {

    return superagent.get('http://localhost:3000')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('<!DOCTYPE '));
        
      })
      .catch(console.err);

  });

  it('handles a get request with a query string', () => {

    return superagent.get('http://localhost:3000/cowsay?text=moooo')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('moooo'));
      })
      .catch(console.err);

  });

  it('handles a /cowsay request without a query string', () => {

    return superagent.get('http://localhost:3000/cowsay')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('I need something to say'));
      })
      .catch(console.err);

  });
  
  it('handles a good post request', () => {
    let obj = {text:'mooooo'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(obj)
      .then(response => {
        expect(response.text).toEqual(expect.stringContaining('{"content":"mooooo"}'));
      })
      .catch(console.err);
  });

  it('handles a bad post request with no text query', () => {
    let obj = {query:'mooooo'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(obj)
      // .then(response => null)
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual(expect.stringContaining('{"ERROR":"invalid request: text query required"}'));
      });
  });

  it('handles a 400 error with no body', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
  
      // .then(response => false);
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual(expect.stringContaining(`{ERROR: 'invalid request: body required'}`));
      });
  });


});