/* Set the enable_profiler value to "true" to enable the profiler and "false" to disable the profiler. 
*/
const config = {
    port: 5000,
    session: {
        secret: "keyboardkitteh",
        resave: false,
        saveUninitialized: true
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sports_players'
    },
    enable_profiler: false
};

module.exports = config;