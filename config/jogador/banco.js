var database_url = "postgres://ruptjkilyotmae:a431ea3c7079749c8effe5e14953bc6107d35a6b5fb0885b49014fcb94b4afb0@ec2-50-17-194-129.compute-1.amazonaws.com:5432/d2o9bmebg4cijo";
const { Pool } = require('pg');
const pool  = new Pool({
  connectionString: process.env.DATABASE_URL || database_url,
  ssl: true
})

module.exports.insert = function(NM_JOGADOR, STEAM64, CAMINHO_IMG){
  try {
    let command = 'INSERT INTO TB_JOGADOR(NM_JOGADOR,STEAM64,CAMINHO_IMG,NM_IMG) VALUES($1,$2,$3,$4)';
    let values = [NM_JOGADOR,STEAM64,CAMINHO_IMG,'iMAGEM DE: '+NM_JOGADOR];
    return pool.connect()
      .then(client=>{
        return client.query(command,values)
          .then(res => {
            client.release();
            console.log(res);
           })
          .catch(e =>{
            client.release();
            console.log(e.stack);
           });
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports.findAll = function(){
  try {
    let command = 'SELECT * FROM TB_JOGADOR';
    return pool.connect()
      .then(client => {
        return client.query(command)
          .then(res => {
            client.release();
            return res;
          })
          .catch(e => {
            client.release();
            console.log(e.stack)
          });
      })
  } catch (err) {
    console.log(err);
  }
}
/*
module.exports.teste = function(steam64){
  return steam64;
}*/


module.exports.findById = function(id){
  try {
    let commnad = 'SELECT * FROM TB_JOGADOR WHERE ID_JOGADOR=$1';
    let values = [id];
    return pool.connect()
      .this(client => {
        return client.query(command,values)
          .then(res => {
            client.release();
            return res;
          })
          .catch(e => {
            client.release();
            console.log(e.stack)}
          );
      })
  } catch (err) {
    console.log(err);
  }
}


module.exports.findBySteam64 = function(Steam64){
  try {
    var command = 'SELECT * FROM TB_JOGADOR WHERE STEAM64=$1';
    let values = [Steam64];
    return pool.connect()
      .then(client => {
        return client.query(command,values)
          .then(res => {
            client.release();
            console.log(res.rowCount);
            console.log(res.fields.length);
            return res;
          })
          .catch(e=> {
            client.release();
            console.log(e.stack)
          })
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports.update = function(NM_JOGADOR, STEAM64, CAMINHO_IMG){
  try {
    let command = 'UPDATE TB_JOGADOR SET NM_JOGADOR=$1,STEAM64=$2,CAMINHO_IMG=$3 WHERE STEAM64=$2';
    let values = [NM_JOGADOR,STEAM64,CAMINHO_IMG];
    return pool.connect()
      .then(client => {
        return client.query(command,values)
          .then(res => {
            client.release();
          })
          .catch(e => {
            client.release();
            console.log(e.stack);
          });
      })
  } catch (err) {
    console.log(err);
  }
}
