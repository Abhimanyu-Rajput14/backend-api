const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'your_user',
    password: 'your_password',
    database: 'your_database',
    max: 20,  // Max connections allowed in pool
    idleTimeoutMillis: 30000,  // Idle timeout (in milliseconds)
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = pool;
