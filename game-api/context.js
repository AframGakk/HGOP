const express = require("express");
const database = require("./database.js");
const lucky21 = require("./lucky21.js");
const { Client } = require('pg');
const deck = require('./deck.js');
const dealer = require('./dealer.js');
const server = require('./server.js');
const inject = require('./inject.js');

module.exports = {
    newContext: () => {
        return inject({
            'express': express,
            'pgClient': Client,
            'database': database,
            'lucky21': lucky21,
            'deck': deck,
            'dealer': dealer,
            'server': server,
        });
    },
};
