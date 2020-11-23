const { Pool } = require('pg')

// PG object will proprogate the env variables from env file automatically for db connection
const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
}