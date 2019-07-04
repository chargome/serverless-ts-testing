/*
    Config setup for local testing
*/
const path = require('path');
process.env.DOT_ENV_PATH = path.join(__dirname, '.env');
process.env.CONTAINER_TABLE_NAME = 'transdanubia-dev-container';