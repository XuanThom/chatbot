const { Pool } = require('pg');

const pool = new Pool({
  user: 'chatbot_user',
  host: 'postgres',       // tên service trong docker-compose
  database: 'chatbot_db',
  password: 'chatbot_pass',
  port: 5432,
});

module.exports = pool;
