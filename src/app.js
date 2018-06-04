'use strict';

const http = require('http');
var cowsay = require('cowsay');
const parser = require('./lib/parser');
const fs = require('fs');

const root = __dirname + '/..';
const requestHandler = (request, res) => {

  parser(request)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        fs.readFile(`${root}/index.html`, (err, data) => {
          if (err) throw err;
          else {
            let text = data.toString();
            res.write( text.replace('{{cowsay}}', cowsay.say({text: 'homepage'})));
            res.end();
            return;
          }
        });

      } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        if (req.url.query.text) {
          fs.readFile(`${root}/index.html`, (err, data) => {
            if (err) throw err;
            else {
              let text = data.toString();
              res.write( text.replace('{{cowsay}}', cowsay.say({text: req.url.query.text})));
              res.end();
              return;
            }
          });
        } else {
          fs.readFile(`${root}/index.html`, (err, data) => {
            if (err) throw err;
            else {
              let text = data.toString();
              res.write( text.replace('{{cowsay}}', cowsay.say({text: 'I need something to say!!'})));
              res.end();
              return;
            }
          });
        }
      } else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {

        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        
        let jsonString;

        if (!req.body) {
          jsonString = {ERROR: 'invalid request: body required'};
        } else if (!req.body.text) {
          jsonString = {ERROR: 'invalid request: text query required'};
        } else {
          jsonString = {content: req.body.text};
        }

        fs.readFile(`${root}/index.html`, (err, data) => {
          if (err) throw err;
          else {
            let text = data.toString();
            res.write(text.replace('{{cowsay}}', JSON.stringify(jsonString)));
            res.end();
            return;
          }
        });

      } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('404 error not found');
        res.end();
      }
    })
    .catch(err => {
      res.writeHead(500);
      res.write(`!!ERROR:  ${err}`);
      res.end();
    });
};

const app = http.createServer(requestHandler);

module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: callback => app.close(callback),
};