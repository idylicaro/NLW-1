import path from 'path';
const connectionConfig = require('./src/config/database');
module.exports = {
    client:'pg',
    connection:{
        host:connectionConfig.host,
        user:connectionConfig.user,
        password:connectionConfig.password,
        database:connectionConfig.database
    },
    migrations:{
        directory: path.resolve(__dirname,'src','database','migrations'),
    },
    seeds:{
        directory: path.resolve(__dirname,'src','database','seeds'),
    }
};