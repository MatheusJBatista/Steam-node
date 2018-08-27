var app = require('./config/server');
//var home = require('./app/routes/steam/home')(app);
//var home = require('./app/routes/steam/auth')(app);
//var home = require('./app/routes/steam/verify')(app);
var port = process.env.PORT || 5000


app.listen(port, function(){
  console.log('Servidor Rodando na porta 5000');
});
