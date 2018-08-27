var express = require('express');
var app = express();
var steam = require('steam-login');
var consign = require('consign');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    realm: 'http://localhost:5000/',
    verify: 'http://localhost:5000/verify',
    apiKey: '69FC736459FCC5094E6CE76DCD0A466D'}
));
app.use(express.static('./app/views/public'));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/model')
  .into(app);

module.exports = app;
