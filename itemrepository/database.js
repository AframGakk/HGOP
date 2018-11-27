const { Client } = require('pg');

// export available database functions.
module.exports = {
    insertItem: (name, insertDate, onInsert) => {
        var client = getClient();
        client.connect(() => {
            const query = {
                text: 'INSERT INTO Item(Name, InsertDate) VALUES($1, $2);',
                values: [name, insertDate],
            }
            client.query(query, () => {
                onInsert();
                client.end();
            });
        });
        return;
    },
    getItems: (onGet) => {
        var client = getClient();
        client.connect(() => {
            const query = {
                text: 'SELECT ID, Name, InsertDate FROM Item ORDER BY InsertDate DESC LIMIT 10;',
                rowMode: 'array'
            }
            client.query(query, (err, res) => {
                onGet(res.rows.map(row => {
                    return {
                        id: row[0],
                        name: row[1],
                        insertdate: row[2]
                    }
                }));
                client.end();
            });
        });
        return;
    }
}

function getClient() {
    return new Client({
        host: "your container name",
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    });
}

var client = getClient();
client.connect((err) => {
    if (err) {
        console.log('failed to connect to postgres!');
    } else {
        console.log('successfully connected to postgres!');
        client.query('CREATE TABLE IF NOT EXISTS Item (ID SERIAL PRIMARY KEY, Name VARCHAR(32) NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
            if (err) {
                console.log('error creating Item table!')
            } else {
                console.log('successfully created item table!')
            }
            client.end();
        });
    }
});
