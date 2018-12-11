module.exports = function(context) {
    const express = context("express");
    const database = context("database");
    const configConstructor = context('config');
    const config = configConstructor(context);
    const lucky21Constructor = context("lucky21");

    let app = express();

    app.get('/status', (req, res) => {
        res.statusCode = 200;
        res.send('The API is running!\n');
    });

    let game = undefined;

    // Starts a new game.
    app.post('/stats', (req, res) => {
        let data = database(context);
        data.getTotalNumberOfGames((totalNumberOfGames) => {
            data.getTotalNumberOfWins((totalNumberOfWins) => {
                data.getTotalNumberOf21((totalNumberOf21) => {
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
                    let data = database(context);
                    const won = game.playerWon(game);
                    const score = game.getCardsValue(game);
                    const total = game.getTotal(game);
                    data.insertResult(won, score, total, () => {
                        console.log('Game result inserted to database');
                    }, (err) => {
                        console.log('Failed to insert game result, Error:' + JSON.stringify(err));
                    });
                }
                res.statusCode = 201;
                res.send(lucky21.getState(game));
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

                    let data = database(context);

                    data.insertResult(won, score, total, () => {
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
}
