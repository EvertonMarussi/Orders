const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '14032006',
  database: 'orders_db',
  port: 5432
})

module.exports = pool