module.exports = function(context) {
    return {
        // Postgres
        pgHost: process.env.POSTGRES_HOST || 'localhost',
        pgUser: process.env.POSTGRES_USER || 'game',
        pgDatabase: process.env.POSTGRES_DB || 'game_database',
        pgPassword: process.env.POSTGRES_PASSWORD || '12345',
        // Port
        port: process.env.PORT || 3000,
    };
};
