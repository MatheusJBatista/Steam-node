var steam = require('steam-login');
var banco = require('../../../config/jogador/banco');

module.exports = function(app){
  app.get('/verify',steam.verify(), function(req,res){
    try {
      var selectBySteam64 = banco.findBySteam64(req.user.steamid);
      //console.log(selectBySteam64);
      selectBySteam64.then(function(result){
        selectBySteam64 = result;

        if (selectBySteam64.rowCount == 0) {
          banco.insert(req.user.username,req.user.steamid,req.user.avatar.large);
        } else {
          banco.update(req.user.username,req.user.steamid,req.user.avatar.large);
        }
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  });
}
