var banco = require('../../../config/jogador/banco');

module.exports = function(app){
  app.get('/', function(req,res){
    var steam = banco.findAll();
    steam.then(function (result){
      steam = result;
      if (steam.rowCount != 0) {
        res.render('index', { steam: steam });
      } else {
        res.render('index');
      }
    });
  });
}
