var express = require('express');
var router = express.Router();
var steam = require('steam-login');
const key = <steam-key>;
const banco = <url>;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || banco,
  ssl: true
});

/* GET home page. */
router.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
router.use(steam.middleware({
	realm: 'localhost',
	verify: 'localhost/verify',
	apiKey: key}
));

router.get('/',async function(req, res) {
  try {
    //typeof req.user.steamid == 'undefined' ? steam64 = req.user.steamid : steam64='';
      const cliente = await pool.connect();
      const select = await cliente.query('SELECT * FROM TB_JOGADOR');
      cliente.release();

      //var userLoged = req.user == null ? 'not logged in' : req.user.avatar.large;
      if (typeof select != 'undefined')
        res.render('index', {select:select});
      else{
        select = '';
        res.render('index', {select:select});}

	}catch(err){
		console.log(err);
	}
});

router.get('/auth', steam.authenticate(), function(req, res) {
	res.redirect('/');
});

router.get('/verify', steam.verify(),async function(req, res, next) {
	try {
		const cliente = await pool.connect();
		const select = await cliente.query('SELECT STEAM64 FROM TB_JOGADOR WHERE STEAM64 = $1',[req.user.steamid]);

    console.log(select);

		if (select.rowCount == 0) {
			console.log('0 registro');
			var steam64 = req.user.steamid;
			var nick = req.user.username;
			var img = req.user.avatar.large;
			var nmImg = 'IMG DO '+steam64;
			var mmr = 100;
			var dtCadastro = 'now()';

      /*
      let inserts = 'INSERT INTO TB_JOGADOR';
      inserts += '(NM_JOGADOR,STEAM64,MMR_JOGADOR,CAMINH_IMG,NM_IMG,DT_CADASTRO) ';
      inserts += 'VALUES($1,$2,$3,$4,$5,$6)',[nick,steam64,mmr,img,nmImg,dtCadastro];*/

			const cliente = await pool.connect();
			const insert = await cliente.query('INSERT INTO TB_JOGADOR(NM_JOGADOR,STEAM64,MMR_JOGADOR,CAMINH_IMG,NM_IMG,DT_CADASTRO) VALUES($1,$2,$3,$4,$5,$6)',[nick,steam64,mmr,img,nmImg,dtCadastro]);
      cliente.release();
    }else {
      /*
      let updates = 'UPDATE TB_JOGADOR ';
      updates += 'SET NM_JOGADOR=$1';
      updates += ',CAMINH_IMG=$2';
      updates += ' WHERE STEAM64=$3',[req.user.username,req.user.avatar.large,req.user.steamid];*/

      console.log(updates);

      const cliente = await pool.connect();
      const update = await cliente.query('UPDATE TB_JOGADOR SET NM_JOGADOR=$1,CAMINH_IMG=$2 WHERE STEAM64=$3',[req.user.username,req.user.avatar.large,req.user.steamid]);
      cliente.release();
    }
	} catch (err) {
		console.log(err);
	}
	next();
},function(req,res,next){
  //let steam64 = CryptoJS.AES.encrypt(steam64);
	res.redirect('/');
});

router.get('/logout', steam.enforceLogin('/'), function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
