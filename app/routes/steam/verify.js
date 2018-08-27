var steam = require('steam-login');

module.exports = function(app){
  app.get('/verify',steam.verify(), function(req,res){
    var pool = app.config.dbConnection;
    var steam = app.app.model.jogadorModel;
    steam.findBySteam64(req.user.steamid, pool, function(err, result){
      if(err){
        console.log(err.stack);
      }
      else {
        console.log(result.rowCount);
        if (result.rowCount == 0) {
          steam.insert(req.user.username, req.user.steamid, req.user.avatar.large, pool, function(err, result){
            if (err) {
              console.log(err);
            }
          })
        }
      else {
        steam.update(req.user.steamid,req.user.username,req.user.avatar.large, pool, function(err, result){
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });/*
  setTimeout(function(){
    res.redirect('/');
  },1500);*/
  res.redirect('/');
});
}
