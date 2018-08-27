var database_url = <url>
const { Pool } = require('pg');

var pool = function(){
  return new Pool({
    connectionString: process.env.DATABASE_URL || database_url,
    ssl: true
  });
}

module.exports = function(){
  return pool;
}
