const helper = require('./server.lib-test.js');

const timeout = 30000;

// TODO what does the done parameter do?
test('play a game', function(done) {
    helper.playGame(process.env.API_URL, done);
}, timeout);