var app = require('./config/server');
var home = require('./app/routes/steam/home')(app);


app.listen(3000, function(){
  console.log('Servidor Rodando na porta 3000');
});
