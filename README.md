[![Build Status](https://travis-ci.com/khuynh92/07-http-server.svg?branch=master)](https://travis-ci.com/khuynh92/07-http-server)

# 07-HTTP-SERVER

## overview
This applcation is meant to demonstrate the use of a vanilla Javascript HTTP server that does not use any 3rd party server libraries. The application will create a talking cow that has different messages depending on the GET request. Sending a POST will write to api/cowsay.

## getting started

After downloading the starter code run, `npm i` to install all dependencies of the project.

Create a .env file in the project's root directory and set port, e.g. 

`PORT = 3000`

To run the projet either type

`node index.js`

or 

`npm start`

go to `http://localhost:3000` or replace 3000 with your port name you sent in .env

click on the link on the homepage to bring you to the cowsay page.

To create new text, at the end of the adress bar add a text query e.g.

`http://localhost:3000/cowsay?text=helloworld!`

Have fun!
