'use strict';

const url = require('url');
const queryString = require('querystring');

function parser(req) {
  return new Promise((resolve, reject) => {
    if(!req || !req.url) {
      reject('Invalid Request Object. Could not parse information.');
    }

    req.url = url.parse(req.url);
   
    req.url.query = queryString.parse(req.url.query);

    if(!req.method || !req.method.match(/POST/) ) {
      resolve(req);
    }

    let text = '';

    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    req.on('end', () => {
      try{
        req.body = JSON.parse(text);
        resolve(req);
      }
      catch(err) { reject(err); }

    });

    req.on('err', reject);

  }); 
}

module.exports = parser;