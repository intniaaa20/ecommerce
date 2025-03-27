 // db.js
 const { Pool } = require('pg');
 const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce-proweb',
  password: 'postgres',
  port: 5432,
 });
 module.exports = pool;