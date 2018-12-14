module.exports = function(context) {
    const express = context("express");
    const databaseConstructor = context("database");
    const database = databaseConstructor(context);
    const configConstructor = context('config');
    const config = configConstructor(context);
    const lucky21Constructor = context("lucky21");
    var StatsD = require('hot-shots');
    var client = new StatsD();

    let app = express();

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/status', (req, res) => {
        res.statusCode = 200;
        res.send('The API is running!\n');
    });

    let game = undefined;

    // Starts a new game.
    app.get('/stats', (req, res) => {
        database.getTotalNumberOfGames((totalNumberOfGames) => {
            database.getTotalNumberOfWins((totalNumberOfWins) => {
                database.getTotalNumberOf21((totalNumberOf21) => {
                    res.statusCode = 200;
                    res.send({
                        totalNumberOfGames: totalNumberOfGames,
                        totalNumberOfWins: totalNumberOfWins,
                        totalNumberOf21: totalNumberOf21,
                    });
                }, (err) => {
                    console.log('Failed to get total number of 21, Error:' + JSON.stringify(err));
                    res.statusCode = 500;
                    res.send();
                });
            }, (err) => {
                console.log('Failed to get total number of wins, Error:' + JSON.stringify(err));
                res.statusCode = 500;
                res.send();
            });
        }, (err) => {
            console.log('Failed to get total number of games, Error:' + JSON.stringify(err));
            res.statusCode = 500;
            res.send();
        });
    });

    // Starts a new game.
    app.post('/start', (req, res) => {
        if (game && game.isGameOver(game) == false) {
            res.statusCode = 409;
            res.send('There is already a game in progress');
        } else {
            client.increment('games.started', 1);
            game = lucky21Constructor(context);
            const msg = 'Game started';
            res.statusCode = 201;
            res.send(msg);
        }
    });

    // Returns the player's board state.
    app.get('/state', (req, res) => {
        if (game) {
            res.statusCode = 200;
            res.send(game.getState(game));
        } else {
            const msg = 'Game not started'
            res.statusCode = 204;
            res.send(msg);
        }
    });

    // Player makes a guess that the next card will be 21 or under..
    app.post('/guess21OrUnder', (req, res) => {
        if (game) {
            if (game.isGameOver(game)) {
                const msg = 'Game is already over'
                res.statusCode = 403;
                res.send(msg);
            } else {
                game.guess21OrUnder(game);
                if (game.isGameOver(game)) {
                    const won = game.playerWon(game);
                    const score = game.getCardsValue(game);
                    const total = game.getTotal(game);
                    database.insertResult(won, score, total, () => {
                        console.log('Game result inserted to database');
                    }, (err) => {
                        console.log('Failed to insert game result, Error:' + JSON.stringify(err));
                    });
                }
                res.statusCode = 201;
                res.send(game.getState(game));
            }
        } else {
            const msg = 'Game not started'
            res.statusCode = 204;
            res.send(msg);
        }
    });

    // Player makes a guess that the next card will be over 21.
    app.post('/guessOver21', (req, res) => {
        if (game) {
            if (game.isGameOver(game)) {
                const msg = 'Game is already over'
                res.statusCode = 403;
                res.send(msg);
            } else {
                game.guessOver21(game);
                if (game.isGameOver(game)) {
                    const won = game.playerWon(game);
                    const score = game.getCardsValue(game);
                    const total = game.getTotal(game);
                    database.insertResult(won, score, total, () => {
                        console.log('Game result inserted to database');
                    }, (err) => {
                        console.log('Failed to insert game result, Error:' + JSON.stringify(err));
                    });
                }
                res.statusCode = 201;
                res.send(game.getState(game));
            }
        } else {
            const msg = 'Game not started'
            res.statusCode = 204;
            res.send(msg);
        }
    });

    const port = config.port;
    return {
        listen: () => {
            app.listen(port, () => {
                console.log('Game API listening on port ' + port);
            });
        }
    };
};
