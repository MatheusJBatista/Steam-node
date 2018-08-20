const banco = <key>
const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || banco,
  ssl: true
})

var conexao = pool.connect();

module.exports.insert =function(NM_JOGADOR, STEAM64, CAMINH_IMG){
  try {
    const insert = conexao.query('INSERT INTO TB_JOGADOR(NM_JOGADOR, STEAM64, CAMINH_IMG,NM_IMG) VALUES($1,$2,$3,$4)',[NM_JOGADOR,STEAM64,CAMINH_IMG,'iMAGEM DE: '+NM_JOGADOR]);
    conexao.release();
  } catch (err) {
    console.log(err);
  }
}


module.exports.findAll = function(){
  try {
    const selectAll = conexao.query('SELECT * FROM TB_JOGADOR');
    conexao.release();
  } catch (err) {
    console.log(err);
  }
}


module.exports.findById = function(id){
  try {
    var selectById = conexao.query('SELECT * FROM TB_JOGADOR WHERE ID_JOGADOR=$1',[id]);
    conexao.release();
  } catch (err) {
    console.log(err);
  }
}


module.exports.findBySteam64 = function(Steam64){
  try {
    var selectBySteam64 = conexao.query('SELECT * FROM TB_JOGADOR WHERE STEAM64=$1',[Steam64]);
    conexao.release();
  } catch (err) {
    console.log(err);
  }
}

module.exports.update = function(NM_JOGADOR, STEAM64, CAMINH_IMG){
  try {
    const update = conexao.query('UPDATE TB_JOGADOR SET NM_JOGADOR=$1,STEAM64=$2,CAMINH_IMG=$3 WHERE STEAM64=$2',[NM_JOGADOR,STEAM64,CAMINH_IMG]);
  } catch (err) {
    console.log(err);
  }
}
