let tableInserted = false

const createTable = async (pool, callback) => {
  if (!tableInserted) {
    await pool().connect((err, client, done) => {
      if (err) throw (err);
      let query = `CREATE TABLE IF NOT EXISTS PLAYERS(`
      query += `ID varchar(500) primary key, NM_JOGADOR varchar(500) null,STEAM64 varchar(500) null,CAMINHO_IMG varchar(500) null,NM_IMG varchar(500) null)`
      client.query(query, callback);
      tableInserted = true
    })
  }
}

const findAll = (pool, callback) => {
  pool().connect((err, client, done) => {
    if (err) throw (err);
    client.query('SELECT * FROM PLAYERS', callback);
  });
}

const findBySteam64 = (id, pool, callback) => {
  pool().connect((err, client, done) => {
    if (err) {
      throw err;
    }
    client.query('SELECT * FROM PLAYERS WHERE STEAM64= $1', [id], callback);
  });
}

const insert = (NM_JOGADOR, STEAM64, CAMINHO_IMG, pool, callback) => {
  pool().connect((err, client, done) => {
    if (err) {
      throw err;
    }
    let command = 'INSERT INTO PLAYERS(ID, NM_JOGADOR,STEAM64,CAMINHO_IMG,NM_IMG) VALUES($1,$2,$3,$4,$5)';
    let values = ['uuid_generate_v4()', NM_JOGADOR, STEAM64, CAMINHO_IMG, 'iMAGEM DE: ' + NM_JOGADOR];
    client.query(command, values, callback);
  })
}

const update = (STEAM64, NM_JOGADOR, CAMINHO_IMG, pool, callback) => {
  pool().connect((err, client, done) => {
    if (err) {
      throw err;
    }
    let command = 'UPDATE PLAYERS SET NM_JOGADOR=$1,STEAM64=$2,CAMINHO_IMG=$3 WHERE STEAM64=$2';
    let values = [NM_JOGADOR, STEAM64, CAMINHO_IMG];
    client.query(command, values, callback);
  });
}

module.exports = {
  createTable,
  findAll,
  findBySteam64,
  insert,
  update
}
