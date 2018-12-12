module.exports = function(context) {
    const Client = context('pgClient');
    const configConstructor = context('config');
    const config = configConstructor(context);

    function getClient() {
        return new Client({
            host: config.pgHost,
            user: config.pgUser,
            password: config.pgPassword,
            database: config.pgDatabase,
        });
    }

    let client = getClient();
    setTimeout(() => {
        client.connect((err) => {
            if (err) {
                console.log('failed to connect to postgres!');
            } else {
                console.log('successfully connected to postgres!');
            }
        });
    }, 2000);
    return {
        insertResult: (won, score, total, onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {

                    const query = {
                        text: 'INSERT INTO "GameResult" ("Won", "Score", "Total", "InsertDate") VALUES($1, $2, $3, CURRENT_TIMESTAMP)',
                        values: [won, score, total],
                    }
                    client.query(query, (err) => {
                        if (err) {
                            onError();
                        } else {

                            onSuccess();
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        //So how the queries were before, dident get me the right result from capacity test
        //There for i changed them to be more like insertResult here above
        // Should call onSuccess with integer.
        getTotalNumberOfGames: (onSuccess, onError) => {
            const client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: `SELECT COUNT("Total") FROM "GameResult";`,
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            console.log("Error in query:");
                            onError();
                        } else {
                            onSuccess(res.rows[0].count);
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOfWins: (onSuccess, onError) => {
            const client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: `SELECT COUNT(*) FROM "GameResult" WHERE "Won"=true;`,
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            console.log("Error in query:");
                            onError();
                        } else {
                            onSuccess(res.rows[0].count);
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOf21: (onSuccess, onError) => {
            const client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: `SELECT COUNT(*) FROM "GameResult" WHERE "Score"=21;`,
                    };
                    client.query(query, (err, res) => {
                        if (err) {
                            console.log("Error in query:");
                            onError();
                        } else {
                            onSuccess(res.rows[0].count);
                        }
                        client.end();
                    });
                }
            });
            return;
        },
    };
};