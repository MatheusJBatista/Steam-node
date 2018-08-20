var steam = require('steam-login');
var banco = require('../../../config/jogador/banco');

module.exports = function(app){
  app.get('/verify',steam.verify(), function(req,res){
    try {
      console.log(banco);
      var selectById = banco.findBySteam64(req.user.steamid);
      console.log(selectById);
      if (selectById.rowCount == 0) {
        banco.insert();
      } else {
        //banco.update(req.user.steamid);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
