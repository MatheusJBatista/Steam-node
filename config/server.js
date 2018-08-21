var express = require('express');
var app = express();
var steam = require('steam-login');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    realm: 'http://localhost:5000/',
    verify: 'http://localhost:5000/verify',
    apiKey: <key>}
));

app.use(express.static('./app/public'));

module.exports = app;
