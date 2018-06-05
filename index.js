'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const server = require('./src/app');



server.start(PORT, () => console.log('Server running on port, ' + PORT));