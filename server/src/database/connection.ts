import knex from 'knex';
const connectionConfig = require('../config/database');
const connection = knex({
    client: 'pg',
    connection:{
        host:connectionConfig.host,
        user:connectionConfig.user,
        password:connectionConfig.password,
        database:connectionConfig.database
    }
})

export default connection;