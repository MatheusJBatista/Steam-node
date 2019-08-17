let steam = require('steam-login');
module.exports = function(app){
  app.get('/auth', steam.authenticate(), function(req, res) {
    res.redirect('/');
});
}
