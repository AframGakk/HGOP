const context = require('./context.js').newContext();
const server = context('server')(context);
server.listen();
