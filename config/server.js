var express = require('express');
var app = express();
var steam = require('steam-login');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    realm: 'http://localhost:3000/',
    verify: 'http://localhost:3000/verify',
    apiKey: '69FC736459FCC5094E6CE76DCD0A466D'}
));

app.use(express.static('./app/public'));

module.exports = app;
