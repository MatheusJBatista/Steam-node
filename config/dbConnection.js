var database_url = "postgres://ruptjkilyotmae:a431ea3c7079749c8effe5e14953bc6107d35a6b5fb0885b49014fcb94b4afb0@ec2-50-17-194-129.compute-1.amazonaws.com:5432/d2o9bmebg4cijo";
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
