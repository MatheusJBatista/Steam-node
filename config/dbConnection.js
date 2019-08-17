let database_url = "postgres://sa:sa123456@localhost:5432/master";
const { Pool } = require('pg');

let pool = function(){
  return new Pool({
    connectionString: process.env.DATABASE_URL || database_url,
    ssl: process.env.DATABASE_SSL || false
  });
}

module.exports = function(){
  return pool;
}
