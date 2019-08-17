let app = require('./config/server');
//let home = require('./app/routes/steam/home')(app);
//let home = require('./app/routes/steam/auth')(app);
//let home = require('./app/routes/steam/verify')(app);
let port = process.env.PORT || 5000


app.listen(port, function(){
  console.log('Servidor Rodando na porta 5000');
});
