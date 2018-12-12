const request = require('request');

const playGame = (url, done) => {
    request.post(url + '/start', function(error, response, body) {
        if (error) {
            done.fail(error);
            return;
        }
        //I dont wanna wait for 1000 years
        //console.log('start: ' + response['statusCode'] + ' - ' + body);
        guessUntilGameIsOver(url, 12, done);
    });
};

// Recursive function that makes a guess until the game is over
// or the maxGuesses is reached.
const guessUntilGameIsOver = (url, maxGuesses, done) => {
    if (maxGuesses === 0) {
        done.fail('the game is never over');
        return;
    }
    request.get(url + '/state', function(error, response, body) {
        if (error) {
            done.fail(error);
            return;
        }
        //I dont wanna wait for 1000 years
        //console.log('state: ' + response['statusCode'] + ' - ' + body);
        if (JSON.parse(body).gameOver) {
            done();
            return;
        }
        const possibilities = ['guess21OrUnder', 'guessOver21'];
        const guess = possibilities[Math.floor(Math.random() * 2)];
        request.post(url + '/' + guess, function(error, response, body) {
            if (error) {
                done.fail(error);
                return;
            }
            //I dont wanna wait for 1000 years
            //console.log('guess: ' + response['statusCode'] + ' - ' + body);
            guessUntilGameIsOver(url, maxGuesses - 1, done);
        });
    });
};

module.exports = {
    playGame: playGame,
    guessUntilGameIsOver: guessUntilGameIsOver,
};