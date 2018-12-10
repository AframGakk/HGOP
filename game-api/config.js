module.exports = function(context) {
    return {
        // Postgres
        pgHost: process.env.POSTGRES_HOST || 'localhost',
        pgUser: process.env.POSTGRES_USER || 'villi',
        pgPassword: process.env.POSTGRES_PASSWORD || 'aframgakk1',
        pgDatabase: process.env.POSTGRES_DB || 'cardgame',

        // Port
        port: process.env.PORT || 3000,
    };
};
