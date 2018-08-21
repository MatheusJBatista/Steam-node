var database_url = <url>
const { Client } = require('pg');
const client  = new Client({
  connectionString: process.env.DATABASE_URL || database_url,
  ssl: true
})

module.exports.insert = function(NM_JOGADOR, STEAM64, CAMINH_IMG){
  try {
    let command = 'INSERT INTO TB_JOGADOR(NM_JOGADOR, STEAM64, CAMINH_IMG,NM_IMG) VALUES($1,$2,$3,$4)';
    let values = [NM_JOGADOR,STEAM64,CAMINH_IMG,'iMAGEM DE: '+NM_JOGADOR];
    client.connect();
    client.query(insert,values,)
        .then(res => { return res; })
        .catch(e => console.log(e.stack));
    client.end();
  } catch (err) {
    console.log(err);
  }
}

module.exports.findAll = function(){
  try {
    let command = 'SELECT * FROM TB_JOGADOR';
    client.connect();
    client.query(command)
      .then(res => { return res })
      .catch(e => console.log(e.stack));
    client.end();
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
    client.connect();
    client.query(select,values)
      .then(res => { return res; })
      .catch(e => console.log(e.stack));
    client.end();
  } catch (err) {
    console.log(err);
  }
}


module.exports.findBySteam64 = function(Steam64){
  try {
    var command = 'SELECT * FROM TB_JOGADOR WHERE STEAM64=$1';
    let values = [Steam64];
    client.connect();
    client.query(command,values)
      .then(res => { console.log(res); })
      .catch(e=> console.log(e.stack));
    client.end();
  } catch (err) {
    console.log(err);
  }
}

module.exports.update = function(NM_JOGADOR, STEAM64, CAMINH_IMG){
  try {
    let command = 'UPDATE TB_JOGADOR SET NM_JOGADOR=$1,STEAM64=$2,CAMINH_IMG=$3 WHERE STEAM64=$2';
    let values = [NM_JOGADOR,STEAM64,CAMINH_IMG];
    client.connect();
    client.query(command,values)
      .then(res => { return res })
      .catch(e => console.log(e.stack));
    client.end();
  } catch (err) {
    console.log(err);
  }
}
